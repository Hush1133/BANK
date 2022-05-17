import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

export interface DialogData {
	object: any;
	index: number;
}

@Component({
	selector: "app-create-transaction",
	templateUrl: "./create-transaction.component.html",
	styleUrls: ["./create-transaction.component.css"],
})
export class CreateTransactionComponent implements OnInit {
	createForm: FormGroup;
	Clients: any = [];
	Accounts: any = [];
	selectedclient: any;
	selectedaccount: any;
	transactiontype: any;
	fromAccount: any;
	newTransaction: any;
	newToAccount: any;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public dialogdata: DialogData
	) {
		this.getData();
		this.fromAccount = this.dialogdata.object;
		console.log(this.fromAccount);
		this.mainForm();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	getData() {
		this.apiService.getClients().subscribe((data) => {
			this.Clients = data;
		});
		this.apiService.getAccounts().subscribe((data) => {
			this.Accounts = data;
		});
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			comment: [""],
			amount: [
				"",
				[
					Validators.required,
					Validators.max(this.fromAccount.balance),
					Validators.min(1),
				],
			],
		});
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			this.newTransaction = this.createForm.value;

			this.newTransaction.transactiontype = this.transactiontype;
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
			this.newTransaction.date = now;
			switch (this.transactiontype) {
				case "BETWEENACCS":
					this.newTransaction.fromAcc =
						this.fromAccount.accountNumber;
					this.newTransaction.toAcc =
						this.selectedaccount.accountNumber;
					this.selectedaccount.balance += this.newTransaction.amount;
					this.fromAccount.balance -= this.newTransaction.amount;
					break;
				case "CASHIN":
					this.newTransaction.toAcc = this.fromAccount.accountNumber;
					this.fromAccount.balance += this.newTransaction.amount;
					break;
				case "CASHOUT":
					this.newTransaction.fromAcc =
						this.fromAccount.accountNumber;
					this.fromAccount.balance -= this.newTransaction.amount;
					break;
				default:
					console.log("none selected");
					break;
			}
			this.apiService
				.createTransaction(this.newTransaction)
				.subscribe((transactiondata) => {
					console.log(transactiondata);
				});
			this.apiService
				.updateAccount(this.fromAccount.id, this.fromAccount)
				.subscribe((data) => {
					console.log(data);
				});
			this.apiService
				.updateAccount(this.selectedaccount.id, this.selectedaccount)
				.subscribe((data) => {
					console.log(data);
				});
		}
	}
}
