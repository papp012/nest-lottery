import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis'
import { DatabaseModule } from '../database/database.module';
import { LotteryNumbersService } from './lotterynumbers.service';
import { lotteryNumbersProviders } from './lotterynumbers.providers';
import { LotteryNumbersController } from './lotterynumbers.controller';

@Module({
  imports: [
    DatabaseModule,
    RedisModule.forRoot({
        config: {
          url: 'redis://localhost:6379'
        },
      }),],
  controllers: [LotteryNumbersController],
  providers: [
    LotteryNumbersService,
    ...lotteryNumbersProviders,
  ],
})
export class LotteryNumbersModule {}