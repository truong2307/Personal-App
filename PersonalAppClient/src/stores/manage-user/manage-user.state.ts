import { UserForAdminManagerDto } from "src/shared/model/User.interface";

export interface ManageUserState {
  items: UserForAdminManagerDto[];
  totalItem: number;
  error?: string;
}
