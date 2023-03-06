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
        //return [1,2,3,4,5]
    }

    @Post()
    async writeWinningNumbers(
        @Body("numbers") winningNumbers: CreateLotteryNumbersDto,
    ) {
        //for testing:
        console.log(winningNumbers)

        const numbers = await this.lotterNumbersService.writeWinningNumbers(
            winningNumbers
        );
        return winningNumbers;
    }

}