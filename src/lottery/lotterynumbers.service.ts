import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { LotteryNumbers } from './interfaces/lotterynumbers.interface';
import { CreateLotteryNumbersDto } from './dto/create.lotterynumbers.dto';
import { InjectRedis,Redis } from "@nestjs-modules/ioredis";


@Injectable()
export class LotteryNumbersService {
  constructor(
    @Inject('LOTTERYNUMBERS_MODEL') private readonly lotteryNumbersModel: Model<LotteryNumbers>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async writeWinningNumbers(createLotteryNumbersDto: CreateLotteryNumbersDto): Promise<LotteryNumbers> {
    const winningNumbers = new this.lotteryNumbersModel({winningNumbers: createLotteryNumbersDto});
    return winningNumbers.save();   
  }

  async readWinningNumbers() {
    if (await this.redis.hlen("winning-numbers") === 0 ) {

      const winningNumbers = await this.lotteryNumbersModel.find().exec();
      await this.redis.hset("winning-numbers",{"numbers":winningNumbers[0].winningNumbers});
      
      // key expires after 15 sec
      // configban beállítani
      await this.redis.expire("winning-numbers", 15);

      return JSON.parse(`{ 
        "winning numbers": [${winningNumbers[0].winningNumbers}],
        "source": "mongodb"}`)
      
     
    } 
    
    return JSON.parse(`{ 
      "winning numbers": [${await this.redis.hget("winning-numbers", "numbers")}],
      "source": "redis"}`)
  
  }

  async deleteWinningnumbers() {
    await this.lotteryNumbersModel.deleteOne().exec();
  }
}