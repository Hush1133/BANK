import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-create-client",
	templateUrl: "./create-client.component.html",
	styleUrls: ["./create-client.component.css"],
})
export class CreateClientComponent implements OnInit {
	createForm: FormGroup;
	newClient: any;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService
	) {
		this.mainForm();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	mainForm() {
		this.createForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			IDnum: ["", [Validators.required]],
			phone: [""],
			address: [""],
			cID: [""],
		});
	}																	//uj kliens hozzaadasa

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			this.newClient = this.createForm.value;
			this.newClient.cID = Math.random().toString().substr(2, 6);  //kliens id generalas
			this.newClient.deleted = false;
			this.newClient.Accounts = [];
			this.apiService.createClient(this.newClient).subscribe(
				() => {
					console.log("success?");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
