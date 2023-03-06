import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  readWinningNumbers(): string {
    return this.appService.readWinningNumbers();
  }

  @Post()
  writeWinningNumbers(
    @Body('numbers') winningNumbers: string,
  ) {
    console.log(winningNumbers);
    this.appService.writeWinningNumbers();
  }
}
