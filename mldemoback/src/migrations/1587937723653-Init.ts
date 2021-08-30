import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1587937723653 implements MigrationInterface {
    name = 'Init1587937723653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `entry` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(10) NOT NULL, `algorithm` varchar(255) NOT NULL, `train_acc` int NOT NULL, `val_acc` int NOT NULL, `config_object` json NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `entry`", undefined);
    }

}
