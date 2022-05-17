import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { CreateAccountComponent } from "../create-account/create-account.component";

@Component({
	selector: "app-accounts",
	templateUrl: "./accounts.component.html",
	styleUrls: ["./accounts.component.css"],
})
export class AccountsComponent implements OnInit {
	Accounts: any = [];

	constructor(private apiService: ApiService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.apiService.getAccounts().subscribe((data) => {
			this.Accounts = data;
		});
	}

	createAccount() {
		const dialogRef = this.dialog.open(CreateAccountComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.getData();
			}
		});
	}
}
