import { Action } from "@ngrx/store";
import { UserForAdminManagerDto } from "src/shared/model/User.interface";

export const GET_USERS = 'GET_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export class GetUsersAction implements Action{
  readonly type = GET_USERS;
}

export class GetUsersSuccessAction implements Action{
  readonly type = GET_USERS_SUCCESS;
  constructor(public users: UserForAdminManagerDto[]){}
}

export class UpdateUsersAction implements Action{
  readonly type = UPDATE_USER;
}

export class UpdateUsersSuccessAction implements Action{
  readonly type = UPDATE_USER_SUCCESS;
  constructor(public user: UserForAdminManagerDto){}
}

export class FetchDataErrorAction implements Action{
  readonly type = FETCH_DATA_ERROR;
  constructor(public error: string){}
}


export type ManageUser =
| GetUsersAction
| GetUsersSuccessAction
| UpdateUsersAction
| UpdateUsersSuccessAction
| FetchDataErrorAction
