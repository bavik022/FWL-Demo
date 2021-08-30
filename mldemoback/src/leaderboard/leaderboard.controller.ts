import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { EntryDto } from './entry.dto';
import { LeaderboardService } from './leaderboard.service';
import { Entry } from './entry.entity';

@Controller('leaderboard')
export class LeaderboardController {

    constructor(private readonly service:LeaderboardService){}

    @Get()
    async getAll(){
        return await (this.service.findAllEntries())
        .then(response => response)
        .catch(err => err);
    }

    @Get(':username')
    async findOneById(@Param('username') username: string){
        return await this.service.findOneByUsername(username)
        .then(response => {return ({
            status: "User found",
            user: response
        })})
        .catch(err => {return ({
            status: "User not found",
            user: undefined
        })});
    }

    @Post()
    async createEntry(@Body() entryDto: EntryDto){
        let newEntry = new Entry();
        newEntry.username = entryDto.username;
        newEntry.algorithm = entryDto.algorithm;
        newEntry.val_acc = entryDto.val_acc;
        newEntry.train_acc = entryDto.train_acc;
        newEntry.config_object = entryDto.config_object;
        return await this.service.create(newEntry)
        .then(response => response)
        .catch(err => err);
        
    }
}
