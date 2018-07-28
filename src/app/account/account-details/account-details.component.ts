import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { AccountModel } from '../account.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html'
})
export class AccountDetailsComponent implements OnInit {

  @Input() accInput: AccountModel;

  @Output() accountOut = new EventEmitter();

  icon: string;
  classIcon: string;
  CD: string = "CD";
  CC: string = "CC";
  CP: string = "CP";
  CI: string = "CI";


  constructor() { }

  ngOnInit() {
    this.changeIcon(this.accInput.typeOfAccount);
  }

  changeIcon(type: string){
    if(type === this.CD){
      this.icon="ti-credit-card";
      this.classIcon="icon-big icon-info text-center";
    } else if(type === this.CC){
      this.icon="ti-money";
      this.classIcon="icon-big icon-success text-center";
    } else if(type === this.CP){
      this.icon="ti-bar-chart";
      this.classIcon="icon-big icon-danger text-center";
    } else if(type === this.CI){
        this.icon="ti-stats-up";
        this.classIcon="icon-big icon-warning text-center";
    } else {
        this.icon="ti-wallet";
        this.classIcon="icon-big icon-info text-center";
    }
  }

  modifyAccount(){
    this.accountOut.emit(this.accInput);
  }

}
