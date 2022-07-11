import { ManageUserState } from "./manage-user.state";

import * as ManageUserAction from "./manage-user.action"

const initialState : ManageUserState = {
  items: [],
  error : '',
  totalItem: 0,
  pageIndex: 0,
  pageSize: 10,
};

export function manageUserReducer(
  state: ManageUserState = initialState,
  action: ManageUserAction.ManageUser
): ManageUserState {
  switch (action.type) {
    case ManageUserAction.GET_USERS:
      return {...state, pageIndex: action.payload.pageIndex, pageSize: action.payload.pageSize};
    case ManageUserAction.GET_USERS_SUCCESS:
      return {...state, items: action.users, totalItem: action.totalItem};
    case ManageUserAction.FETCH_DATA_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
}
