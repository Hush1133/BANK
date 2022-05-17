import { getRepository } from "typeorm";
import { Account } from "../entity/Account";
import { Controller } from "./controller";

export class AccountController extends Controller {
	repository = getRepository(Account);
}
