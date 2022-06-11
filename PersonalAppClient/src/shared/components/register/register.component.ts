import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserRegister } from 'src/shared/model/User.interface';
import { AuthServices } from 'src/services/authServices.service';
import { validatePassword } from 'src/shared/validatePattern/validatePassword';
import { RegisterAction } from 'src/stores/auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  patternValidatePassword = validatePassword.PATTERN_PASSWORD;
  title: string = 'Register';
  user! : UserRegister;
  registerForm!: FormGroup

  //form

  constructor(
    private loader: NgxUiLoaderService,
    private authService: AuthServices,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm ( ){
    this.registerForm = new FormGroup({
      emailLogin : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.pattern(this.patternValidatePassword)]),
      fullName : new FormControl('', [Validators.required, Validators.minLength(4)]),
      phoneNumber : new FormControl(''),
    })
  }

  get emailLogin() {
    return this.registerForm.get('emailLogin');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  onSubmit(){
    this.loader.start();
    const {emailLogin, ...data} = this.registerForm.value;
    this.user = data;
    this.user.email = emailLogin;

    this.store.dispatch(new RegisterAction(this.user))

    this.loader.stop();
  }
}
