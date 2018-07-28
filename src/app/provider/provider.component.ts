import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../category/category.model';
import { SubCategoryModel } from '../category/sub-category.model';
import { CategoryService } from '../category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderModel } from './provider.model';
import { ProviderService } from './provider.service';

declare var $:any;

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
})
export class ProviderComponent implements OnInit {

  categories: CategoryModel[];

  subCategories: SubCategoryModel[];

  providers: ProviderModel[];

  formCadProvider: FormGroup;

  idProvider: number;

  idCategory: number;

  flag: number = 1;

  constructor(private categoryService: CategoryService,
              private providerService: ProviderService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getAllCategories();

    this.getAllProviders();

    this.getAllSubCategories();

    this.formCadProvider = this.formBuilder.group({
      name_provider: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      category: this.formBuilder.group({
        id_category: this.formBuilder.control('', [Validators.required]),
      }),
      subCategory: this.formBuilder.group({
        id_subCategory: this.formBuilder.control(''),
      }),
    })
  }

  saveProvider(provider: ProviderModel){
    if (this.flag === 1){
      this.providerService.saveProvider(provider)
      .subscribe((provider2: ProviderModel) => {
        this.showNotification("Empresa cadastrada com sucesso", "success", "ti-face-smile")
        this.formCadProvider.reset()
        this.providers.push(provider2)
      })
    } else {
      provider.id_provider = this.idProvider;
      this.providerService.putProvider(provider)
        .subscribe((provider2: ProviderModel) => {
          this.showNotification("Empresa atualizada com sucesso.", "success", "ti-face-smile")
          this.formCadProvider.reset()
          this.flag=1
          this.providers.splice(this.providers.indexOf(provider), 1);
          this.providers.push(provider2)
        })
    }
  }

  editProvider(pro: ProviderModel){
    this.idProvider = pro.id_provider;
    this.flag =0;
    this.formCadProvider.setValue({
      name_provider: pro.name_provider,
      category: {
        id_category: pro.category.id_category,
      },
      subCategory: {
        id_subCategory: pro.subCategory.id_subCategory,
      }
    });
  }

  resetSubCategory(){
    this.subCategories = [];
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe(categories => this.categories = categories);
  }

  getAllProviders(){
    this.providerService.getAllProviders().subscribe(providers => this.providers = providers)
  }

  getAllSubCategories(){
    this.categoryService.getAllSubCategory().subscribe(sucategories => this.subCategories)
  }

  getAllSubCategoriesByCategories(id: number){
    this.categoryService.getAllSubCategoryByIdCategory(id)
      .subscribe(subcategories => this.subCategories = subcategories);
  }

  resetForm(pro?: ProviderModel){
    this.formCadProvider.reset();
  }

  showNotification(message: string, type: string, icon: string) {
    $.notify({
      icon: icon,
      message: message
    }, {
        type: "success",
        timer: 1500,
        placement: {
          from: "top",
          align: 'center',
        }
      });
  }

}
