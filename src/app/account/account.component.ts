import { Component, OnInit, Output } from '@angular/core';
import { AccountModel } from './account.model';
import { AccountService } from './account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';

declare var $:any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  @Output() accounts: AccountModel[]

  formCadAccount: FormGroup;

  balance: number;

  flag: number =1;

  id: number;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getAll();

    this.formCadAccount = this.formBuilder.group({
      name_account: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      startBalance: this.formBuilder.control('', [Validators.required]),
      limite: this.formBuilder.control('',),
      typeOfAccount: this.formBuilder.control('', [Validators.required]),
    });
  }

  saveAccount(account: AccountModel){
    if (this.flag === 1){
      this.accountService.saveAccount(account)
      .subscribe((account: AccountModel) => {
        this.showNotification("Conta cadastrada com sucesso", "success", "ti-face-smile")
        this.formCadAccount.reset()
      })
      account.balance = account.startBalance
    } else {
      account.id_account=this.id;
      account.balance = this.balance;
      this.accountService.putAccount(account)
        .subscribe((account: AccountModel) => {
          this.showNotification("Dados da conta atualizados com sucesso.", "success", "ti-face-smile")
          this.formCadAccount.reset()
          this.flag=1
        })
    }
    this.accounts.push(account)
  }

  editAccount(acc: AccountModel){
    this.id =acc.id_account,
    this.flag=0,
    this.balance=acc.balance;
    this.formCadAccount.setValue({
      name_account: acc.name_account,
      startBalance: acc.balance,
      limite: acc.limite,
      typeOfAccount:acc.typeOfAccount,
    });
    this.accounts.splice(this.accounts.indexOf(acc), 1);
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

  getAll(){
    this.accountService.getAllAccounts().subscribe(accounts => this.accounts = accounts)
  }

  resetForm(acc?: AccountModel){
    if(this.flag === 0){
      acc.balance = this.balance;
      this.accounts.push(acc)
      this.flag=1;
    }
    this.formCadAccount.reset();
  }

  getFlag(){
    if(this.flag === 0){
      return false;
    } else{
      return true;
    }
  }
}
