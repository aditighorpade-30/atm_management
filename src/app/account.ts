import { User } from "./user";

export class Account{
    accNo!: number;
    accBalance!: number;
    amount!: number;
    senderaccno?: number;
    receiveraccno?:number;
    user!: User;
    userId!: any;
}