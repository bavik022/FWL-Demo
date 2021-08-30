import { Entry } from "./entry.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class LeaderboardService {
    constructor(
        @InjectRepository(Entry)
        readonly repository: Repository<Entry>
    ){}

    public async create(entry: Entry): Promise<Entry>{
        return this.repository.save(entry);
    }

    public async findOneByUsername(username: string): Promise<Entry> {
        return this.repository.findOneOrFail({username:username});
    }

    public async findAllEntries(): Promise<Entry[]>{
        return this.repository.find();
    }
}