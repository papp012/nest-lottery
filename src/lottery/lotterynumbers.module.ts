import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LotteryNumbersService } from './lotterynumbers.service';
import { lotteryNumbersProviders } from './lotterynumbers.providers';
import { LotteryNumbersController } from './lotterynumbers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LotteryNumbersController],
  providers: [
    LotteryNumbersService,
    ...lotteryNumbersProviders,
  ],
})
export class LotteryNumbersModule {}