import { Action } from "@ngrx/store";
import { UserLogin, UserRegister } from "src/shared/model/User.interface";

export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN_ERROR';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
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

export class RegisterAction implements Action{
  readonly type = REGISTER;
  constructor(public userRegister: UserRegister){}
}

export class RegisterSuccessAction implements Action{
  readonly type = REGISTER_SUCCESS;
}

export class RegisterErrorAction implements Action{
  readonly type = REGISTER_ERROR;
}

export class AdminlogoutAction implements Action{
  readonly type = ADMIN_LOG_OUT;
}

export type AuthAction =
|  AdminloginAction
| AdminloginSuccessAction
| AdminloginErrorAction
| AdminlogoutAction
| RegisterAction
| RegisterSuccessAction
| RegisterErrorAction
