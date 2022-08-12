import { UserForAdminManagerDto } from "src/shared/model/user.interface";

export interface ManageUserState {
  items: UserForAdminManagerDto[];
  totalItem: number;
  error?: string;
}
