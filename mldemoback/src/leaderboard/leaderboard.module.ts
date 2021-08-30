import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { LeaderboardService } from './leaderboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [LeaderboardController],
  providers: [LeaderboardService]
})
export class LeaderboardModule {}
