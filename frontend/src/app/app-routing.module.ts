import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssessmentComponent } from "./components/assessment/assessment.component";
import { ClientsComponent } from "./components/clients/clients.component";

const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "clients" },
	{ path: "clients", component: ClientsComponent },
	{ path: "assessment", component: AssessmentComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
