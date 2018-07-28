import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { CategoryModel } from './category.model';
import { SubCategoryModel } from './sub-category.model';
import { SubCategoryPassModel } from './sub-category-pass.model';

declare var $:any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryModel[];

  subCategories: SubCategoryModel[];

  formCadCategory: FormGroup;

  formCadSubCategory: FormGroup;

  flag: number = 1;

  flag2: number =1;

  id: number;

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder ) { }

  ngOnInit() {

    this.getAllCategories();

    this.getAllSubCategories();

    this.formCadCategory = this.formBuilder.group({
      name_category: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      typeOfLaunch: this.formBuilder.control('', [Validators.required]),
    });

    this.formCadSubCategory = this.formBuilder.group({
      category: this.formBuilder.group({
        id_category: this.formBuilder.control('', [Validators.required]),
      }),
      subCategoryName: this.formBuilder.control('', [Validators.required])
    });

  }

  saveCategory(category: CategoryModel){
    if (this.flag === 1){
      this.categoryService.saveCategory(category)
      .subscribe((category2: CategoryModel) => {
        this.showNotification("Categoria cadastrada com sucesso", "success", "ti-face-smile")
        this.formCadCategory.reset()
        this.categories.push(category2)
      })
    } else {
      this.categories.splice(this.categories.indexOf(category, 1));
      category.id_category = this.id;
      this.categoryService.putCategory(category)
        .subscribe((category2: CategoryModel) => {
          this.showNotification("Categoria atualizados com sucesso.", "success", "ti-face-smile")
          this.formCadCategory.reset()
          this.flag=1
          this.categories.push(category2)
        })
    }
  }

  saveSubCategory(subCategory: SubCategoryModel){
    console.log(subCategory.category)
    if (this.flag2 === 1){
      this.categoryService.saveSubCategory(subCategory)
      .subscribe((subCategory2: SubCategoryModel) => {
        this.showNotification("Sub-categoria cadastrada com sucesso", "success", "ti-face-smile")
        this.formCadSubCategory.reset()
        this.subCategories.push(subCategory2)
      })
    } else {
      subCategory.id_subCategory = this.id;
      this.subCategories.splice(this.subCategories.indexOf(subCategory, 1));
      this.categoryService.putSubCategory(subCategory)
        .subscribe((subCategory2: SubCategoryModel) => {
          this.showNotification("Sub-categoria atualizados com sucesso.", "success", "ti-face-smile")
          this.formCadSubCategory.reset()
          this.flag2=1
          this.subCategories.push(subCategory2)
        })
    }
  }

  editSubCategory(subCat: SubCategoryModel){
    this.flag2 = 0;
    this.formCadCategory.reset()
    this.formCadSubCategory.reset();
    this.id = subCat.id_subCategory;
    this.formCadSubCategory.patchValue({
      subCategoryName: subCat.subCategoryName,
    })
    this.formCadSubCategory.get("category").setValue({
      id_category: subCat.category.id_category,
    })
  }

  editCategory(cat: CategoryModel){
    this.flag = 0;
    this.formCadCategory.reset()
    this.formCadSubCategory.reset();
    this.id = cat.id_category;
    this.formCadCategory.setValue({
      name_category: cat.name_category,
      typeOfLaunch: cat.typeOfLaunch,
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe(categories => this.categories = categories);
  }

  getAllSubCategories(){
    this.categoryService.getAllSubCategory().subscribe(subcategories => this.subCategories = subcategories);
  }
  resetCategoryForm(){
    this.formCadCategory.reset()
    this.flag = 1;
    this.id = null;
  }

  resetSubCategoryForm(){
    this.formCadSubCategory.reset();
    this.flag2 = 1;
    this.id=null;
  }

  showNotification(message: string, type: string, icon: string) {
    $.notify({
      icon: icon,
      message: message
    }, {
        type: type,
        timer: 1500,
        placement: {
          from: "top",
          align: 'center',
        }
      });
  }

}
