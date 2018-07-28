import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { CategoryModel } from "./category.model";
import { Observable } from "rxjs/Observable";
import { PF_API } from "../../pf.api";
import { Injectable } from "@angular/core";
import { SubCategoryModel } from "./sub-category.model";

@Injectable()
export class CategoryService{
    constructor(
        private httpC: HttpClient,
        private http: Http
    ){}

    saveCategory(category: CategoryModel): Observable<CategoryModel>{
        return this.httpC.post<CategoryModel>(`${PF_API}/category/cadastrar`, category);
    }

    getAllCategory(search?: string): Observable<CategoryModel[]>{
        return this.http.get(`${PF_API}/category/all`, {params: {q: search}})
            .map(response => response.json());
    }

    getAllSubCategoryByIdCategory(id_category: number): Observable<SubCategoryModel[]>{
        return this.http.get(`${PF_API}/category/subcategories/${id_category}`)
            .map(response => response.json());
    }

    putCategory(category: CategoryModel): Observable<CategoryModel>{
        return this.httpC.put<CategoryModel>(`${PF_API}/category/change`, category);
    }

    saveSubCategory(subCategory: SubCategoryModel): Observable<SubCategoryModel>{
        return this.httpC.post<SubCategoryModel>(`${PF_API}/category/cadastrarsubcategory`, subCategory);
    }

    putSubCategory(subCategory: SubCategoryModel): Observable<SubCategoryModel>{
        return this.httpC.put<SubCategoryModel>(`${PF_API}/category/changesubcategory`, subCategory);
    }

    getAllSubCategory(search?: string): Observable<SubCategoryModel[]>{
        return this.http.get(`${PF_API}/category/allsubcategory`, {params: {q: search}})
            .map(response => response.json());
    }
}