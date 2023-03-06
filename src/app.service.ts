import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  readWinningNumbers(): string {
    return '3 4 5 6 7';
  }

  writeWinningNumbers() {
    // posting winning lottery numbers of this week
  };

  storeWinningNumbers() {
    // store winning lottery numbers in persistent storage
  }
}
