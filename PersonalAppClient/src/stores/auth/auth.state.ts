import { UserLogin, UserRegister } from "src/shared/model/user.interface";

export interface AuthState {
  item: UserLogin;
  itemRegister: UserRegister;
  error?: string;
  token?: string;
}
