import { Component, OnInit, Output, Input } from '@angular/core';
import { ExtractService } from './extract.service';
import { LaunchesModel } from '../launches/launches.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountModel } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { ExtractFilterModel } from './extract.filter.model';
import { LaunchesService } from '../launches/launches.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})

export class ExtractComponent implements OnInit {

  formPassFilters: FormGroup;

  launches: LaunchesModel[] = [];

  accounts: AccountModel[] = [];

  sumEntrada: number = 0;

  sumSaida: number = 0;

  principalAccount = new AccountModel(0, null, '', null, null, '');

  filter = new ExtractFilterModel(null, 0, null, null);

  constructor(private extractService: ExtractService, private formBuilder: FormBuilder,
              private accountService: AccountService, private launcheService: LaunchesService,
              private router: Router) { }

  ngOnInit() {
    this.enterExtract();

    this.getAllAccounts();

    this.getPrincipalAccount();

    this.formPassFilters = this.formBuilder.group({
      operation: this.formBuilder.control('0', [Validators.required]),
      account: this.formBuilder.group({
        id_account: this.formBuilder.control('', [Validators.required])
      }),
      initDate: '',
      finalDate: ''
    })
  }

  enterExtract(){
    this.extractService.postFilter(this.filter).subscribe((response: LaunchesModel[]) => {
      this.launches = response;
      this.calcSums();
    });
  }


  getAllAccounts(){
    this.accountService.getAllAccounts().subscribe(accounts => this.accounts = accounts);
  }

  getPrincipalAccount(){
    this.extractService.getPrincipalAccount().subscribe((principal: AccountModel) => {
      this.principalAccount = principal;
    })
  }

  passFilter(filterForm: ExtractFilterModel){
    this.setPrincipalAccountById(filterForm.account.id_account);
    this.extractService.postFilter(filterForm).subscribe((response: LaunchesModel[]) => {
      this.launches = response;
      this.calcSums();
    });
  }

  setPrincipalAccountById(id: number): void{
    for (let i = 0; i < this.accounts.length; i++){
      if(this.accounts[i].id_account == id){
       this.principalAccount = this.accounts[i];
      }
    }
  }

  calcSums(): void{
    this.sumEntrada = 0;
    this.sumSaida = 0;
    for (let i=0; i< this.launches.length; i++){
      if(this.launches[i].typeOfLaunch == "S"){
        this.sumSaida = this.sumSaida+this.launches[i].pay_value;
      } else {
        this.sumEntrada = this.sumEntrada+this.launches[i].pay_value;
      }
    }
  }

  deleteLaunche(idLaunche: number): void{
    this.launcheService.deleteLaunch(idLaunche).subscribe((response: LaunchesModel) => {
      this.enterExtract();
      this.showNotification("Lançamento excluído com sucesso.", "success", "ti-face-smile")
    })
  }

  changeLaunche(launche: LaunchesModel){
    this.launcheService.setAccountPass(launche);
    this.router.navigateByUrl('/launches');
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
