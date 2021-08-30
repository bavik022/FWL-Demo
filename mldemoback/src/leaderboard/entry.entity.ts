import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 10})
    username: string;

    @Column()
    algorithm: string;

    @Column()
    train_acc: number;

    @Column()
    val_acc: number;
    
    @Column({type: "json"})
    config_object: string;
}