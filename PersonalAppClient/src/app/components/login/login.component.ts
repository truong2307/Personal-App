import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/app/model/User.interface';
import { AuthServicesService } from 'src/services/authServices.service';
import { validatePassword } from 'src/shared/validatePattern/validatePassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  patternValidatePassword = validatePassword.PATTERN_PASSWORD;
  title: string = 'Log in';
  userLogin : UserLogin = {} as UserLogin;
  loginForm!: FormGroup

  constructor(
    private authService : AuthServicesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  )
  {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern]]
    })
  }

  onSubmit(){
    console.log(this.userLogin);

    this.authService.loginUser(this.userLogin).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error.error)
        this.toastr.error(error.error);
      }
    )
  }

}
