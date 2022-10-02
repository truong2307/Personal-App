import { UserLogin, UserRegister } from "src/shared/model/user";
import { AuthState } from "./auth.state";

import * as AuthAction from "./auth.actions"

const initialState : AuthState = {
  item : {} as UserLogin,
  itemRegister: {} as UserRegister,
  error : '',
  token : '',
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction.AuthAction

) : AuthState{
  switch (action.type) {
    case AuthAction.ADMIN_LOGIN:
      return {...state, item: action.userLogin};
    case AuthAction.ADMIN_LOGIN_SUCCESS:
      return {...state, token : action.token};
    case AuthAction.ADMIN_LOGIN_ERROR:
      return {...state, error: action.error, token: '', item : null as any};
    case AuthAction.ADMIN_LOG_OUT:
      return {...state};
      case AuthAction.REGISTER:
      return {...state, itemRegister: action.userRegister};
      case AuthAction.REGISTER_SUCCESS:
      return {...state};
      case AuthAction.REGISTER_ERROR:
      return {...state};
    default:
      return state;
  }
}
