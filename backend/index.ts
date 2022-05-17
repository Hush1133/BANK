let express = require("express"),
	cors = require("cors");
import "reflect-metadata";
import { createConnection } from "typeorm";
import { getRouter } from "./routes";

createConnection()
	.then(async (connection) => {
		const app = express();

		app.use(cors());
		app.use(express.json());
		app.use("/serv", getRouter());

		app.listen(420, () => console.log("Listening on port 420..."));
	})
	.catch((error) => console.log(error));
