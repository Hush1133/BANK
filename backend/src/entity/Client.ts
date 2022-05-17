import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Client {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	IDnum: string;

	@Column()
	phone: number;

	@Column()
	cID: number;

	@Column()
	address: string;

	@Column({
		type: "boolean",
	})
	deleted: boolean;

	@Column("jsonb", { array: true })
	Accounts: [];
}
