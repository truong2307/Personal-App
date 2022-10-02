import { UserLogin, UserRegister } from "src/shared/model/user";

export interface AuthState {
  item: UserLogin;
  itemRegister: UserRegister;
  error?: string;
  token?: string;
}
