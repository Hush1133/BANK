import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export enum transactiontype {
	CASHIN = "CASH IN",
	CASHOUT = "CASH OUT",
	BETWEENACCS = "Between accounts",
}

@Entity()
export class Transaction {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	fromAcc: number;

	@Column()
	toAcc: number;

	@Column()
	amount: number;

	@Column()
	comment: string;

	@Column()
	date: string;

	@Column({
		type: "enum",
		enum: transactiontype,
		default: transactiontype.BETWEENACCS,
	})
	transactiontype: transactiontype;
}
