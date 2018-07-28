import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Headers, RequestOptions} from '@angular/http';
import { Http } from "@angular/http";
import { UserModel } from "../users/user.model";
import { Observable } from "rxjs/Observable";
import { PF_API } from "pf.api";
import { AccountModel } from "./account.model";

@Injectable()
export class AccountService{

    accountpass: AccountModel;

    constructor(
        private httpC: HttpClient,
        private http: Http
    ){}

    saveAccount(acc: AccountModel): Observable<AccountModel>{
        return this.httpC.post<AccountModel>(`${PF_API}/account/cadastrar`, acc);
    }

    getAllAccounts(search?: string): Observable<AccountModel[]>{
        return this.http.get(`${PF_API}/account/all`, {params: {q: search}})
            .map(response => response.json());
    }

    putAccount(acc: AccountModel): Observable<AccountModel>{
        return this.httpC.put<AccountModel>(`${PF_API}/account/change`, acc);
    }
}