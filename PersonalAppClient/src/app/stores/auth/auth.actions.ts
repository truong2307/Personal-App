import { Action } from "@ngrx/store";
import { UserLogin } from "src/app/model/User.interface";

export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN_ERROR';
export const ADMIN_LOG_OUT = 'ADMIN_LOG_OUT';

export class AdminloginAction implements Action{
  readonly type = ADMIN_LOGIN;
  constructor(public userLogin: UserLogin){}
}

export class AdminloginSuccessAction implements Action{
  readonly type = ADMIN_LOGIN_SUCCESS;
  constructor(public token: string){}
}

export class AdminloginErrorAction implements Action{
  readonly type = ADMIN_LOGIN_ERROR;
  constructor(public error: string){}
}

export class AdminlogoutAction implements Action{
  readonly type = ADMIN_LOG_OUT;
}

export type AuthAction =
|  AdminloginAction
| AdminloginSuccessAction
| AdminloginErrorAction
| AdminlogoutAction
