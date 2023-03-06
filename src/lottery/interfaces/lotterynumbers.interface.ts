import { Document } from 'mongoose';

export interface LotteryNumbers extends Document {
  readonly winningNumbers: number[];
}