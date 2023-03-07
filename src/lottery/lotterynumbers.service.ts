import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { LotteryNumbers } from './interfaces/lotterynumbers.interface';
import { CreateLotteryNumbersDto } from './dto/create.lotterynumbers.dto';
import { InjectRedis,Redis } from "@nestjs-modules/ioredis";


@Injectable()
export class LotteryNumbersService {
  constructor(
    @Inject('LOTTERYNUMBERS_MODEL')
        private readonly lotteryNumbersModel: Model<LotteryNumbers>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async writeWinningNumbers(createLotteryNumbersDto: CreateLotteryNumbersDto): Promise<LotteryNumbers> {
    const winningNumbers = new this.lotteryNumbersModel({winningNumbers: createLotteryNumbersDto});
    return winningNumbers.save();   
  }

  async readWinningNumbers() {
    if (await this.redis.get("winning-numbers") === null ) {
          console.log("from db")
          const winningNumbers = await this.lotteryNumbersModel.find().exec();

          console.log(winningNumbers[0].winningNumbers);
          //this.redis.rpush("winning-numbers",...winningNumbers[0].winningNumbers);
          this.redis.set("winning-numbers", winningNumbers[0].winningNumbers);
      
          return winningNumbers.map(numbers => ({
                "winning numbers": numbers.winningNumbers,
              }));
        
        } 
        else {
          console.log("from redis")
          return await this.redis.get("winning-numbers")
        }
  }

  async deleteWinningnumbers() {
    await this.lotteryNumbersModel.deleteOne().exec();
  }
}