import { Injectable } from "@angular/core";
import { LaunchesModel } from "./launches.model";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { PF_API } from "../../pf.api";

@Injectable()
export class LaunchesService{

    accountpass: LaunchesModel;

    launchePut: LaunchesModel;

    constructor(
        private httpC: HttpClient,
        private http: Http
    ){}

    saveLaunche(launches: LaunchesModel): Observable<LaunchesModel>{
        return this.httpC.post<LaunchesModel>(`${PF_API}/launches/cadastrar`, launches);
    }

    getAllLaunches(search?: string): Observable<LaunchesModel[]>{
        return this.http.get(`${PF_API}/launches/all`, {params: {q: search}})
            .map(response => response.json());
    }

    putLaunches(launches: LaunchesModel): Observable<LaunchesModel>{
        return this.httpC.put<LaunchesModel>(`${PF_API}/launches/change`, launches);
    }

    deleteLaunch(idLaunche: number): Observable<LaunchesModel>{
        return this.http.get(`${PF_API}/launches/delete/${idLaunche}`, )
            .map(response => response.json());
    }

    getLaunc(): LaunchesModel{
        return this.launchePut;
    }

    setAccountPass(launche: LaunchesModel): void{
        this.launchePut = launche;
    }
}