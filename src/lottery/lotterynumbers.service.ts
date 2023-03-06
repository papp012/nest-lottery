import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { LotteryNumbers } from './interfaces/lotterynumbers.interface';
import { CreateLotteryNumbersDto } from './dto/create.lotterynumbers.dto';


@Injectable()
export class LotteryNumbersService {
  constructor(
    @Inject('LOTTERYNUMBERS_MODEL')
        private readonly lotteryNumbersModel: Model<LotteryNumbers>,
  ) {}

  async writeWinningNumbers(createLotteryNumbersDto: CreateLotteryNumbersDto): Promise<LotteryNumbers> {
    const winningNumbers = new this.lotteryNumbersModel(createLotteryNumbersDto);
    return winningNumbers.save();
  }

  async readWinningNumbers(): Promise<LotteryNumbers[]> {
    return this.lotteryNumbersModel.find().exec();
  }
}