import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";

@Component({
	selector: "app-assessment",
	templateUrl: "./assessment.component.html",
	styleUrls: ["./assessment.component.css"],
})
export class AssessmentComponent implements OnInit {
	createForm: FormGroup;
	Transactions: any = [];
	transactiontable: any;
	displayedColumns: string[] = [
		"fromAcc",
		"toAcc",
		"amount",
		"comment",
		"date",
	];
	dataSource: any = [];
	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
	}

	ngOnInit(): void {
		this.apiService.getTransactions().subscribe((data) => {
			this.Transactions = data;
			this.dataSource = data;
		});
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			search: [""],
		});
	}

	onSearchChange(searchValue: string): void {
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
	}
}
