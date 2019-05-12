import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Http, Headers, Request, RequestMethod, Response, ResponseContentType } from '@angular/http';
import { TransactionCreateCcrDocument, TransactionSaveCcrDocument, InquireCcrDocumentByKeyFields } from '../model';

@Injectable()
export class ProxyCcrDocumentService {

    constructor(
        private http: Http
    ) { }

    createAuthorizationHeader(headers: Headers) {

        headers.append('Content-Type', 'application/json');
        headers.append('x-krungsri-api-token', localStorage.getItem('token'));
        
    }

    private handleError(error: any) {
        let errorBody = JSON.parse(error._body);
        let errorMsg = errorBody.message;
        console.log('Error message: ', errorMsg);
        return throwError(errorMsg);
    };
    submitCreateCcrDocument(model: TransactionCreateCcrDocument): Observable<any> {
        const url = environment.backendBaseUrl + '/ccr/private/document/create';
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, model, {
            headers: headers
        }).map((res: Response) => {
            return res.json();
        })
            .catch(this.handleError);
    }

    submitFineCcrDocument(model: TransactionSaveCcrDocument): Observable<any> {
        const url = environment.backendBaseUrl + '/ccr/local/document';
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, model, {
            headers: headers
        }).map((res: Response) => {
            return res.json();
        })
            .catch(this.handleError);
    }

    submitInquireCcrDocument(model: InquireCcrDocumentByKeyFields): Observable<any> {
        const url = environment.backendBaseUrl + '/ccr/private/document';
        const filter = `/${encodeURIComponent(model.citizenID)}/${model.receiptNo}`
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url + filter, {
            headers: headers
        }).map((res: Response) => {
            return res.json();
        })
            .catch(this.handleError);
    }


}