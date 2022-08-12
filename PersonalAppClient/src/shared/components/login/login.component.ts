import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserLogin } from 'src/shared/model/user.interface';
import { validatePassword } from 'src/shared/validatePattern/validatePassword';
import { AdminloginAction } from 'src/stores/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  patternValidatePassword = validatePassword.PATTERN_PASSWORD;
  title: string = 'Log in';
  userLogin! : UserLogin;
  loginForm!: FormGroup
  error: any;

  constructor(
    private store: Store,
    private loader: NgxUiLoaderService
  )
  {
  }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm (){
    this.loginForm = new FormGroup({
      emailLogin : new FormControl('', [Validators.required, Validators.minLength(5)]),
      password : new FormControl('', [Validators.required, Validators.pattern(this.patternValidatePassword)]),
    })
  }

  get emailLogin() {
    return this.loginForm.get('emailLogin');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(){
    this.loader.start();
    const {emailLogin, ...data} = this.loginForm.value;
    this.userLogin = data;
    this.userLogin.EmailOrUserName = emailLogin;
    this.store.dispatch(new AdminloginAction(this.userLogin));
    this.loader.stop();
  }

}
