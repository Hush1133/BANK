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
	selector: "app-edit-client",
	templateUrl: "./edit-client.component.html",
	styleUrls: ["./edit-client.component.css"],
})
export class EditClientComponent implements OnInit {
	createForm: FormGroup;
	newClient: any;

	matcher = new FormErrorMatcherService();

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public dialogdata: DialogData
	) {
		this.mainForm();
		this.setForm(this.dialogdata.index);
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	setForm(id) {
		this.apiService.getClient(id).subscribe((data) => {
			this.createForm.setValue({
				name: data["name"],
				IDnum: data["IDnum"],
				phone: data["phone"],
				address: data["address"],
				cID: data["cID"],
			});
		});
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			IDnum: ["", [Validators.required]],
			phone: [""],
			address: [""],
			cID: [""],																//kliens modositas
		});
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			this.newClient = this.createForm.value;
			this.newClient.deleted = false;
			//this.apiService.deleteClient(this.newClient.id);
			this.apiService
				.updateClient(this.dialogdata.index, this.newClient)
				.subscribe(
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
