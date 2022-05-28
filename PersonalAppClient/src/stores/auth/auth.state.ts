import { UserLogin } from "src/app/model/User.interface";

export interface AuthState {
  item: UserLogin;
  error?: string;
  token?: string;
}
