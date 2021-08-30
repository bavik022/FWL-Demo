export class EntryDto{
    readonly username: string;
    readonly algorithm: string;
    readonly train_acc: number;
    readonly val_acc: number;
    readonly config_object: string;
}