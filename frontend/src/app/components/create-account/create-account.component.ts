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
	selector: "app-create-account",
	templateUrl: "./create-account.component.html",
	styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
	createForm: FormGroup;
	newAccount: any;
	upClient: any;
	initTransaction: any;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public dialogdata: DialogData
	) {
		this.mainForm();
		this.getClient();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	mainForm() {
		this.createForm = this.formBuilder.group({
			balance: [
				"",
				[Validators.required, Validators.pattern("^[0-9]+$")],
			],
		});
	}

	getClient() {
		this.apiService
			.getClient(this.dialogdata.object.id)
			.subscribe((data) => {
				//data.Accounts.push(this.newAccount);
				this.upClient = data;
			});
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			this.newAccount = this.createForm.value;
			this.newAccount.clientID = this.dialogdata.object.cID;
			let accnum =
				this.dialogdata.object.cID * 10000 +
				this.dialogdata.object.Accounts.length;     //account number generalas
			this.newAccount.accountNumber = accnum;
			this.newAccount.status = "OPEN";
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
				toAcc: this.newAccount.accountNumber,
				amount: this.newAccount.balance,
				comment: "Account opening cash in.",
				date: now,
				transactiontype: "CASHIN",
			};
			this.apiService
				.createTransaction(this.initTransaction)
				.subscribe((transactiondata) => {
					console.log(transactiondata);
				});
			this.upClient.Accounts.push(this.newAccount);
			console.log(this.upClient);
			this.apiService
				.updateClient(this.dialogdata.index, this.upClient)
				.subscribe(
					() => {
						console.log("clientupdated");
					},
					(error) => {
						console.log(error);
					}
				);
			console.log(this.newAccount);

			this.apiService.createAccount(this.newAccount).subscribe(
				() => {
					console.log("Account created!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
