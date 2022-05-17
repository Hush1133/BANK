import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from "@angular/material/core";
import {
	MatDialogModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { AssessmentComponent } from "./components/assessment/assessment.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { CreateAccountComponent } from "./components/create-account/create-account.component";
import { CreateClientComponent } from "./components/create-client/create-client.component";
import { CreateTransactionComponent } from "./components/create-transaction/create-transaction.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { MaterialModule } from "./material.module";
import { ApiService } from "./service/api.service";
import { DeleteConfirmComponent } from './dialogs/delete-confirm/delete-confirm.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

@NgModule({
	declarations: [
		AppComponent,

		ClientsComponent,
		AccountsComponent,
		TransactionsComponent,
		CreateAccountComponent,
		CreateClientComponent,
		CreateTransactionComponent,
		AssessmentComponent,
		DeleteConfirmComponent,
		EditClientComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		LayoutModule,
		MaterialModule,
		ReactiveFormsModule,
		MatDialogModule,
		FlexLayoutModule,
	],
	providers: [
		ApiService,
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
