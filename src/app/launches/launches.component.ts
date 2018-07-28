import { Component, OnInit } from '@angular/core';
import { LaunchesService } from './launches.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaunchesModel } from './launches.model';
import { ProviderService } from '../provider/provider.service';
import { CategoryService } from '../category/category.service';
import { ProviderModel } from '../provider/provider.model';
import { SubCategoryModel } from '../category/sub-category.model';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { AccountModel } from '../account/account.model';
import { AccountService } from '../account/account.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


declare var $:any;

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
})
export class LaunchesComponent implements OnInit {

  formCadLaunches: FormGroup;

  providers: ProviderModel[];

  subCategories: SubCategoryModel[];

  accounts: AccountModel[];

  flag: number = 1;

  id: number;

  vcto: Date;

  selectedFile: string = '';

  numberMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
  })  

  launcheChange = new LaunchesModel(0, null, null, null, null, '', '', 0, 0, 0, 0, 0);

  constructor(private launcheService: LaunchesService, private formBuilder: FormBuilder, private providerService: ProviderService,
              private categoryServie: CategoryService, private accountService: AccountService) { }

  ngOnInit() {

    this.getAllProviders();

    this.getAllSubCategories();

    this.getAllAccounts();

    this.formCadLaunches = this.formBuilder.group({
      dt: this.formBuilder.control('', [Validators.required]),
      provider: this.formBuilder.group({
        id_provider: '',
      }),
      account: this.formBuilder.group({
        id_account: this.formBuilder.control('', [Validators.required]),
      }),
      subCategory: this.formBuilder.group({
        id_subCategory: this.formBuilder.control('', [Validators.required]),
      }),
      typeOfLaunch: this.formBuilder.control('S', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      discont: this.formBuilder.control('', [Validators.required]),
      interest: this.formBuilder.control('', [Validators.required]),
      tt: this.formBuilder.control('', [Validators.required]),
      pay_value: this.formBuilder.control('', [Validators.required]),
    });

    this.changeFlag();
  }

  saveLaunches(launches: LaunchesModel){
    launches.balance = 0;
    if (this.flag === 1){
      // console.log(this.findProviderById(launches.provider).name_provider)
      // launches.provider = this.findProviderById(launches.provider)
      this.launcheService.saveLaunche(launches)
      .subscribe((launche: LaunchesModel) => {
        this.showNotification("Lançamento efetuado com sucesso", "success", "ti-face-smile")
        this.formCadLaunches.reset()
      })

    } else {
      launches.id_launch=this.id;
      this.launcheService.putLaunches(launches)
        .subscribe((launche: LaunchesModel) => {
          this.showNotification("Lançamento modificado com sucesso.", "success", "ti-face-smile")
          this.formCadLaunches.reset()
          this.flag=1
        })
    }

  }

  changeFlag(): void{
    if(this.launcheService.getLaunc() != null){
      this.flag = 0;
      this.launcheChange = this.launcheService.getLaunc();
      var date2 = new Date(this.launcheChange.dt)
      console.log(date2);
      this.id = this.launcheChange.id_launch;
      this.formCadLaunches.setValue({
        dt: date2.toISOString().substring(0,10),
        provider: {
          id_provider: this.launcheChange.provider.id_provider,
        },
        account: {
          id_account: this.launcheChange.account.id_account,
        },
        subCategory: {
          id_subCategory: this.launcheChange.subCategory.id_subCategory,
        },
        typeOfLaunch: this.launcheChange.typeOfLaunch,
        description: this.launcheChange.description,
        discont: this.launcheChange.discont,
        interest: this.launcheChange.interest,
        tt: this.launcheChange.interest,
        pay_value: this.launcheChange.pay_value,
      })
    }
    this.launcheService.setAccountPass(null);
  }

  findProviderById(idProvider: number){
    console.log(idProvider)
    for(var i=0; i<this.providers.length; i++){
      if(this.providers[i].id_provider == idProvider){
        console.log(this.providers[i])
        return this.providers[i];
      }
    }
  }

  onFileChange(event){
    var reader = new FileReader();
    reader.onloadend = (e: Event) => {
      this.selectedFile = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.selectedFile);
    console.log("Testandoooo....")
  }

  getAllProviders(){
    this.providerService.getAllProviders().subscribe(providers => this.providers = providers)
  }

 getAllSubCategories(){
    this.categoryServie.getAllSubCategory().subscribe(subCategories => this.subCategories = subCategories)
 }

 getAllAccounts(){
   this.accountService.getAllAccounts().subscribe(accounts => this.accounts = accounts)
 }

 resetForm(){
   this.formCadLaunches.reset();
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
