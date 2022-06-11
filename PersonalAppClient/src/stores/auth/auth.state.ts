import { UserLogin, UserRegister } from "src/shared/model/User.interface";

export interface AuthState {
  item: UserLogin;
  itemRegister: UserRegister;
  error?: string;
  token?: string;
}
