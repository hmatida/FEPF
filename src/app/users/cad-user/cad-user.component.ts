import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { UserModel } from '../user.model';

declare var $:any;

@Component({
  selector: 'app-cad-user',
  templateUrl: './cad-user.component.html',
})
export class CadUserComponent implements OnInit {

  formUserCad: FormGroup;

  users: UserModel[];

  passUser: UserModel;

  id: number = null;

  flag: number = 1;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getAll();

    this.formUserCad = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      login: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      passwordRpt: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      sex: this.formBuilder.control('', [Validators.required]),
    });
  }

  editUser(usr: UserModel, id: number){
    this.id =id,
    console.log(this.id)
    this.flag=0,
    this.formUserCad.setValue({
      name: usr.name,
      login: usr.login,
      password: "",
      passwordRpt:"",
      sex: usr.sex
    });
    this.users.splice(this.users.indexOf(usr), 1);
  }

  saveUser(usr: UserModel){
    if (this.flag === 1){
      this.userService.saveUsers(usr)
      .subscribe((user: UserModel) => {
        this.showNotification("Usuário cadastrado com sucesso", "success", "ti-face-smile")
        this.formUserCad.reset()
      })
    } else {
      usr.id_usuario=this.id;
      this.userService.putUsers(usr)
        .subscribe((user: UserModel) => {
          this.showNotification("Dados de usuário atualizados com sucesso.", "success", "ti-face-smile")
          this.formUserCad.reset()
          this.flag=1
        })
    }
    this.users.push(usr)
  }

  getAll(){
    this.userService.getAllUsers().subscribe(users => this.users = users)
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

  resetForm(){
    this.formUserCad.reset();
    this.flag=1;
  }
}
