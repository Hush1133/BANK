import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export enum accountstatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED",
}

@Entity()
export class Account {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	clientID: number;

	@Column()
	accountNumber: number;

	@Column()
	balance: number;

	@Column({
		type: "enum",
		enum: accountstatus,
		default: accountstatus.OPEN,
	})
	status: accountstatus;
}
