import * as mongoose from 'mongoose';

export const LotteryNumbersSchema = new mongoose.Schema({
  winningNumbers: [Number],
});