import { Module } from '@nestjs/common';
import { LotteryNumbersModule } from './lottery/lotterynumbers.module';


@Module({
  imports: [
    LotteryNumbersModule,
  ],
 
})
export class AppModule {}
