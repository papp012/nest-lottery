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
    if (await this.redis.llen("winning-numbers") === 0 ) {
      const winningNumbers = await this.lotteryNumbersModel.find().exec();
      await this.redis.rpush("winning-numbers",...winningNumbers[0].winningNumbers);
      return winningNumbers.map(numbers => ({
        "winning numbers": numbers.winningNumbers,
      }));
    } 
    else {
      let numbers: number[] = [];
      for (let i=0; i<5 ;i++) {
        numbers.push(await this.redis.lindex("winning-numbers",i));
      }
      return numbers;
      }
    }

  async deleteWinningnumbers() {
    await this.lotteryNumbersModel.deleteOne().exec();
  }
}