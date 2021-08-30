import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './leaderboard/entry.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LeaderboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
