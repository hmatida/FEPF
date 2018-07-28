import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProviderModel } from "../provider/provider.model";
import { Observable } from "rxjs/Observable";
import { PF_API } from "pf.api";

@Injectable()
export class PrevisonService{
    constructor(
        private http: HttpClient
    ){}

}