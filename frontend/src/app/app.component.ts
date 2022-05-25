import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent {
	title = "nototp";
	public static slinkEnabled: any;

	constructor(){
		AppComponent.slinkEnabled = false;
	}

get linkEnabled(){
	return AppComponent.slinkEnabled;
}

}
