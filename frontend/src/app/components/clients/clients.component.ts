import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmComponent } from "src/app/dialogs/delete-confirm/delete-confirm.component";
import { ApiService } from "src/app/service/api.service";
import { CreateAccountComponent } from "../create-account/create-account.component";
import { CreateClientComponent } from "../create-client/create-client.component";
import { CreateTransactionComponent } from "../create-transaction/create-transaction.component";
import { EditClientComponent } from "../edit-client/edit-client.component";

@Component({
	selector: "app-clients",
	templateUrl: "./clients.component.html",
	styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
	searchForm: FormGroup;
	Clients: any = [];
	Accounts: any = [];
	newClient: any;
	newAccount: any;
	initTransaction: any;

	constructor(private apiService: ApiService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.apiService.getClients().subscribe((data) => {
			this.Clients = data;
		});
		this.apiService.getAccounts().subscribe((data) => {
			this.Accounts = data;
		});
	}

	createClient() {
		const dialogRef = this.dialog.open(CreateClientComponent, {
			width: "400px",
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				console.log("created client!");
				this.getData();
			}
		});
	}

	addAccount(client) {
		console.log(client);
		const dialogRef = this.dialog.open(CreateAccountComponent, {
			data: { object: client, index: client.id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				console.log("account client!");
				this.getData();
			}
		});
	}

	newTransaction(account) {
		const dialogRef = this.dialog.open(CreateTransactionComponent, {
			data: { object: account, index: account.id },
			width: "400px",
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				console.log("transaction successful!");
				this.getData();
			}
		});
	}

	deleteClient(client) {
		//this.newClient = client;
		//this.newClient.deleted = true;
		//this.newClient.name = "ASDASD";
		//client.isdeleted = "true";
		//console.log(this.newClient);
		//this.apiService.deleteClient(this.newClient._id);
		//this.apiService.createClient(this.newClient);
		//this.apiService.updateClient(this.newClient.id, this.newClient);
		//this.getData();     //kliens torles
		const dialogRef = this.dialog.open(DeleteConfirmComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.newClient = client;
				console.log(this.newClient);
				this.newClient.deleted = true;    // statusz
				this.apiService.updateClient(this.newClient.id, this.newClient).subscribe((data) => {
					this.getData();
				});
			}
		});
	}

	deleteAccount(client, account) {
		const dialogRef = this.dialog.open(DeleteConfirmComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.newAccount = account;
				this.newAccount.status = "CLOSED";
				const d = new Date();
				const now =
					d.getFullYear() +
					"." +
					d.getMonth() +
					"." +
					d.getDate() +
					". " +
					d.getHours() +
					":" +
					d.getMinutes();
				this.initTransaction = {
					fromAcc: this.newAccount.accountNumber,
					amount: this.newAccount.balance,
					comment: "Account closing cash out.",
					date: now,
					transactiontype: "CASHOUT",
				};
				this.newAccount.balance = 0;
				this.apiService
					.createTransaction(this.initTransaction)
					.subscribe((transactiondata) => {
						console.log(transactiondata);
					});
				//this.upClient.Accounts.push(this.newAccount);
				//console.log(this.upClient);
				/*this.apiService
					.updateClient(this.dialogdata.index, this.upClient)
					.subscribe(
						() => {
							console.log("clientupdated");
						},
						(error) => {
							console.log(error);
						}
					);
				console.log(this.newAccount);*/

				this.apiService
					.updateAccount(this.newAccount.id, this.newAccount)
					.subscribe(
						() => {
							console.log("Account updated!");
						},
						(error) => {
							console.log(error);
						}
					);
			}
		});
	}

	editClient(client, index) {
		const dialogRef = this.dialog.open(EditClientComponent, {
			data: { myobj: client, index: client.id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.getData();
			}
		});
	}
	/*onSearchChange(searchValue: string): void {
		//console.log(searchValue);
		let tblData: HTMLTableElement = document.getElementById(
			"transactiontable"
		) as HTMLTableElement;
		for (var i = 1; i < tblData.rows.length; i++) {
			var rowData = tblData.rows[i].innerHTML;
			var styleDisplay = "none";
			if (!rowData.toLowerCase().includes(searchValue.toLowerCase())) {
				styleDisplay = "none";
			} else {
				styleDisplay = "";
			}

			tblData.rows[i].style.display = styleDisplay;
		}
	}*/
}
