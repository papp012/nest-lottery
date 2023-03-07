import { Body, Controller, Get, Post } from "@nestjs/common";
import { LotteryNumbersService } from "./lotterynumbers.service";
import { CreateLotteryNumbersDto } from "./dto/create.lotterynumbers.dto";

@Controller('lotteryNumbers')
export class LotteryNumbersController {
    constructor(
        private readonly lotterNumbersService: LotteryNumbersService
    ) {}

    @Get()
    async readWinningNumbers() {
        const winningNumbers = await this.lotterNumbersService.readWinningNumbers();
        return winningNumbers;
    }

    @Post()
    async writeWinningNumbers(
        @Body("numbers") winningNumbers: CreateLotteryNumbersDto,
    ) {
        this.lotterNumbersService.deleteWinningnumbers();

       this.lotterNumbersService.writeWinningNumbers(winningNumbers);
        return winningNumbers;
    }

}