import { getRepository } from "typeorm";
import { Transaction } from "../entity/Transaction";
import { Controller } from "./controller";

export class TransactionController extends Controller {
	repository = getRepository(Transaction);
}
