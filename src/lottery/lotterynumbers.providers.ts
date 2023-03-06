import { Connection } from 'mongoose';
import { LotteryNumbersSchema } from './schemas/lotterynumbers.schema';

export const lotteryNumbersProviders = [
  {
    provide: 'LOTTERYNUMBERS_MODEL',
    useFactory: (connection: Connection) => connection.model('LotteryNumbers', LotteryNumbersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];