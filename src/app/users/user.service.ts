import { Injectable, ErrorHandler } from "@angular/core";
import {Headers, RequestOptions} from '@angular/http';
import { UserModel } from "./user.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import { PF_API } from "pf.api";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class UserService{
    constructor(
        private httpC: HttpClient,
        private http: Http
    ){}

    saveUsers(usr: UserModel): Observable<UserModel>{
        return this.httpC.post<UserModel>(`${PF_API}/users/cadastrar`, usr);
    }

    getAllUsers(search?: string): Observable<UserModel[]>{
        return this.http.get(`${PF_API}/users/allsimple`, {params: {q: search}})
            .map(response => response.json());
    }

    putUsers(usr: UserModel): Observable<UserModel>{
        return this.httpC.put<UserModel>(`${PF_API}/users/change`, usr);
    }
}