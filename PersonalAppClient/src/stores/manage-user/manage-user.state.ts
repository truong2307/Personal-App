import { UserForAdminManagerDto } from "src/shared/model/user";

export interface ManageUserState {
  items: UserForAdminManagerDto[];
  totalItem: number;
  error?: string;
}
