import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { LaunchesModel } from "../launches/launches.model";
import { Observable } from "rxjs";
import { PF_API } from "../../pf.api";
import { AccountModel } from "../account/account.model";
import { ExtractFilterModel } from "./extract.filter.model";

@Injectable()
export class ExtractService{

    constructor(
        private httpC: HttpClient,
        private http: Http
    ){}

    getIt(): Observable<LaunchesModel[]>{
        return this.http.get(`${PF_API}/extract/getIn`)
            .map(response => response.json());
    }

    getPrincipalAccount(): Observable <AccountModel>{
        return this.http.get(`${PF_API}/extract/get_principal`)
            .map(response => response.json());
    }

    postFilter(filter: ExtractFilterModel): Observable<LaunchesModel[]>{
        return this.http.post(`${PF_API}/extract/filter`, filter)
            .map(response => response.json());
    }
}