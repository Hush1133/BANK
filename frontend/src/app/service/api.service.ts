import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	baseUri = "http://localhost:420/serv";

	headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(private http: HttpClient) {}

	getClients() {
		return this.http.get(`${this.baseUri}/getallC`);
	}

	getAccounts() {
		return this.http.get(`${this.baseUri}/getallA`);
	}

	getTransactions() {
		return this.http.get(`${this.baseUri}/getallT`);
	}

	getClient(id: any): Observable<any> {
		const url = `${this.baseUri}/getC/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	getAccount(id: any): Observable<any> {
		const url = `${this.baseUri}/getA/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	getTransaction(id: any): Observable<any> {
		const url = `${this.baseUri}/getT/${id}`;
		return this.http.get(url, { headers: this.headers }).pipe(
			map((res: Response) => {
				return res || {};
			}),
			catchError(this.errorMgmt)
		);
	}

	createClient(data: any): Observable<any> {
		const url = `${this.baseUri}/addC`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	createAccount(data: any): Observable<any> {
		const url = `${this.baseUri}/addA`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}
	createTransaction(data: any): Observable<any> {
		const url = `${this.baseUri}/addT`;
		return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	updateClient(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateC/${id}`;
		console.log(url);
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
		//return this.http.post(url, data).pipe(catchError(this.errorMgmt));
		//return this.http.post(url, data).pipe(catchError(this.errorMgmt));
	}

	updateAccount(id: any, data: any): Observable<any> {
		const url = `${this.baseUri}/updateA/${id}`;
		return this.http
			.put(url, data, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	deleteClient(id: any): Observable<any> {
		const url = `${this.baseUri}/deleteC/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(catchError(this.errorMgmt));
	}

	// Error handling
	errorMgmt(error: HttpErrorResponse) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log("ApiService errorMessage: ", errorMessage);
		return throwError(errorMessage);
	}
}
