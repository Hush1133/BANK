import { getRepository } from "typeorm";
import { Client } from "../entity/Client";
import { Controller } from "./controller";

export class ClientController extends Controller {
	repository = getRepository(Client);
}
