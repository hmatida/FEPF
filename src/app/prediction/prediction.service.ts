import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { PF_API } from "../../pf.api";
import { PredictionModel } from "./prediction.model";
import { PlotsModel } from "./plots.model";

@Injectable()
export class PredictionService{

    accountpass: PredictionModel;

    launchePut: PredictionModel;

    predictions = new Array();

    plots = new Array();

    constructor(
        private httpC: HttpClient,
        private http: Http
    ){}

    savePredLaunche(launche: PredictionModel): Observable<PredictionModel>{
        return this.httpC.post<PredictionModel>(`${PF_API}/prediction/cadastrar`, launche);
    }

    saveCollePredLaunche(launches: PredictionModel[]): Observable<PredictionModel[]>{
        return this.httpC.post<PredictionModel[]>(`${PF_API}/prediction/cadastros`, launches);
    }

    getAllPredLaunches(search?: string): Observable<PredictionModel[]>{
        return this.http.get(`${PF_API}/prediction/all`, {params: {q: search}})
            .map(response => response.json());
    }

    putLaunches(launche: PredictionModel): Observable<PredictionModel>{
        return this.httpC.put<PredictionModel>(`${PF_API}/prediction/change`, launche);
    }

    deletePreLaunch(idLaunche: number): Observable<PredictionModel>{
        return this.http.get(`${PF_API}/prediction/delete/${idLaunche}`, )
            .map(response => response.json());
    }

    getLaunc(): PredictionModel{
        return this.launchePut;
    }

    setAccountPass(launche: PredictionModel): void{
        this.launchePut = launche;
    }

    pushPrediction(prediction: PredictionModel): void{
        this.predictions.push(prediction);
    }

    popPrediction(prediction: PredictionModel): void{
        this.predictions.splice(this.predictions.indexOf(prediction), 1);
    }

    renewPredictions(): void{
        this.predictions = [];
    }

    pushPlot(plot: PlotsModel){
        this.plots.push(plot);
    }

    popPlot(plot: PlotsModel){
        this.plots.splice(this.plots.indexOf(plot), 1);
    }

    renewPlots(): void{
        this.plots = [];
    }

    getAllPlots(): PlotsModel[]{
        return this.plots;
    }

    delPlotById(id: number):void{
        this.plots.splice(id, 1);
    }

    getPredictions(): PredictionModel[]{
        return this.predictions;
    }
}