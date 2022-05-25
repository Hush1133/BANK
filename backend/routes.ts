import { Router } from "express";
import { AccountController } from "./src/controller/account.controller";
import { ClientController } from "./src/controller/client.controller";
import { TransactionController } from "./src/controller/transaction.controller";
import { UserController } from "./src/controller/user.controller";

export function getRouter() {
	const router = Router();

	const transactionController = new TransactionController();
	const accountController = new AccountController();
	const clientController = new ClientController();
	const userController = new UserController();

	router.get("/getallT", transactionController.getAll);
	router.get("/getT/:id", transactionController.getOne);
	router.post("/addT", transactionController.create);
	//router.put("/updateT", transactionController.update);
	router.delete("/deleteT/:id", transactionController.delete);

	router.get("/getallA", accountController.getAll);
	router.get("/getA/:id", accountController.getOne);
	router.post("/addA", accountController.create);
	router.put("/updateA/:id", accountController.update);
	router.delete("/deleteA/:id", accountController.delete);

	router.get("/getallC", clientController.getAll);
	router.get("/getC/:id", clientController.getOne);
	router.post("/addC", clientController.create);
	router.put("/updateC/:id", clientController.update);
	router.delete("/deleteC/:id", clientController.delete);

	router.get("/getU/:username", userController.getOneByName);
	router.post("/addU", userController.create);

	return router;
}
