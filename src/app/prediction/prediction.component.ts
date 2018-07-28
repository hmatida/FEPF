import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider/provider.service';
import { CategoryService } from '../category/category.service';
import { ProviderModel } from '../provider/provider.model';
import { SubCategoryModel } from '../category/sub-category.model';
import { PredictionService } from './prediction.service';
import { PlotsModel } from './plots.model';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PredictionModel } from './prediction.model';
import { CategoryModel } from '../category/category.model';


declare var $: any;

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {

  formCadPreLaunches: FormGroup;

  providers: ProviderModel[];

  subCategories: SubCategoryModel[];

  parcelar: boolean = false;

  nroParcelas: number = 0;

  parcelas: PlotsModel[];

  return: string[];

  provider: ProviderModel;

  numberMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
  })

  constructor(private formBuilder: FormBuilder, private providerService: ProviderService,
    private categoryServie: CategoryService, private predicitonLaService: PredictionService) { }

  ngOnInit() {

    this.getAllProviders();

    this.getAllSubCategories();

    this.formCadPreLaunches = this.formBuilder.group({
      provider: this.formBuilder.group({
        id_provider: '',
      }),
      subCategory: this.formBuilder.group({
        id_subCategory: '',
      }),
      typeOfLaunch: this.formBuilder.control('S', [Validators.required]),
      value: this.formBuilder.control('', [Validators.required]),
      description: '',
      dt_exp: this.formBuilder.control('', [Validators.required]),
    })

    this.parcelas = this.predicitonLaService.getAllPlots();

  }

  setSubcategoryByProvider(){
    this.provider = this.findProviderById(this.formCadPreLaunches.get('provider').value.id_provider);
    this.formCadPreLaunches.get('subCategory').patchValue({
      id_subCategory: this.provider.subCategory.id_subCategory,
    })
    this.formCadPreLaunches.patchValue({
      typeOfLaunch: this.provider.category.typeOfLaunch,
    })
  }


  getAllProviders() {
    this.providerService.getAllProviders().subscribe(providers => this.providers = providers)
  }

  getAllSubCategories() {
    this.categoryServie.getAllSubCategory().subscribe(subCategories => this.subCategories = subCategories)
  }

  isParcelar() {
    if (this.parcelar == false) {
      this.parcelar = true;
    } else {
      this.parcelar = false;
      this.predicitonLaService.renewPlots();
      this.parcelas = this.predicitonLaService.getAllPlots();
    }
  }

  save(prediction?: PredictionModel){
    if(this.predicitonLaService.getAllPlots() == null){
      this.predicitonLaService.savePredLaunche(prediction)
        .subscribe((prediction: PredictionModel) =>{
          this.showNotification("Programção efetuada com sucesso", "success", "ti-face-smile");
          this.formCadPreLaunches.reset();
        } )
    } else {
      for( var i = 0; i < this.parcelas.length; i++){
        var pred = new PredictionModel( null, i + 1, prediction.subCategory, prediction.typeOfLaunch, prediction.provider, this.parcelas[i].value,
                                      prediction.description, this.parcelas[i].vcto, false);
        this.predicitonLaService.pushPrediction(pred);
      }
      this.predicitonLaService.saveCollePredLaunche(this.predicitonLaService.getPredictions())
        .subscribe((preds: PredictionModel[]) => {
          this.showNotification("Programções efetuadas com sucesso", "success", "ti-face-smile");
          this.formCadPreLaunches.reset();
          this.isParcelar();
          this.predicitonLaService.renewPredictions();
        })
    }
  }

  findProviderById(id: number): ProviderModel{
    for (var i = 0; i < this.providers.length; i++){
      if (this.providers[i].id_provider == id){
        return this.providers[i];
      }
    }
    return null;
  }

  setParcelas(parc: number, value: number, data: string): void {
    if (parc <= 1) {
      this.showNotification("O número de parcelas deverá ser maior que 1", "warning", "ti-face-sad");
    } else {
      this.nroParcelas = parc;
      this.return = data.split('-');
      this.predicitonLaService.renewPlots();
      for (var i = 0; i < this.nroParcelas; i++) {
        var date2 = new Date();
        date2.setFullYear(Number(this.return[0]));
        date2.setMonth(Number(this.return[1]) - 1 + i);
        date2.setDate(Number(this.return[2]));
        var plot = new PlotsModel(i, value / parc, date2);
        this.predicitonLaService.pushPlot(plot);
      }
      this.parcelas = this.predicitonLaService.getAllPlots();
    }
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

  delPlots(id: number){
    this.predicitonLaService.delPlotById(id);
  }
}
