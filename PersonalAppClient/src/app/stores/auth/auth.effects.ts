import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import {  of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { AuthServices } from 'src/services/authServices.service';

import * as authAction from "./auth.actions"

@Injectable()
export class AuthEffects {

  adminLogin$ = createEffect(() => this.actions$.pipe(
    ofType(authAction.ADMIN_LOGIN),
    switchMap(userLogin =>
      this.AuthService.loginUser(userLogin['userLogin']).pipe(
        map(token  =>
          {
            localStorage.setItem('token', Object.keys(token).map(key => token[key])[0])
            return new authAction.AdminloginSuccessAction(token)
          }),
        catchError(error =>
          of(new authAction.AdminloginErrorAction(error['error'])
        ))
      ))
  ));

  adminLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authAction.ADMIN_LOGIN_SUCCESS),
        tap((token) => {
          this.toastr.success(
            'login success'
          )
          this.router.navigate(['/admin']);
        })
      ),
    { dispatch: false }
  );

  adminLoginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authAction.ADMIN_LOGIN_ERROR),
        tap((error) => {
          this.toastr.error(
            error['error']
          )
        })
      ),
    { dispatch: false }
  );



  constructor(
    private actions$: Actions,
    private AuthService: AuthServices,
    private toastr: ToastrService,
    private router: Router,
  ) {}
}
