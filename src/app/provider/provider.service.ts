import { ProviderModel } from "./provider.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { PF_API } from "../../pf.api";

@Injectable()
export class ProviderService{

    providerPass: ProviderModel;

    constructor(
        private httpC: HttpClient,
        private http: Http
    ){}

    saveProvider(pro: ProviderModel): Observable<ProviderModel>{
        return this.httpC.post<ProviderModel>(`${PF_API}/provider/cadastrar`, pro);
    }

    getAllProviders(search?: string): Observable<ProviderModel[]>{
        return this.http.get(`${PF_API}/provider/all`, {params: {q: search}})
            .map(response => response.json());
    }

    putProvider(pro: ProviderModel): Observable<ProviderModel>{
        return this.httpC.put<ProviderModel>(`${PF_API}/provider/change`, pro);
    }
}