import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ManageUserService } from "src/services/manage-user.service";
import { ResponseDatas } from "src/shared/model/ResponseData.interface";
import { catchError, map, of, switchMap } from "rxjs";

import * as ManageUserAction from "./manage-user.action"
import { UpdateUser } from "src/shared/model/User.interface";

@Injectable()
export class ManageUserEffects {


  constructor(
    private action$: Actions,
    private service : ManageUserService
    ){
  }

  getUsers$ = createEffect(() => this.action$.pipe(
    ofType(ManageUserAction.GET_USERS),
    switchMap((data : any) =>
      this.service.getUsers(data.payload.pageIndex, data.payload.pageSize).pipe(
        map((results : ResponseDatas) => {
          return new ManageUserAction.GetUsersSuccessAction(results.datas, results.totalItem);
        }),
        catchError(error =>
          of(new ManageUserAction.FetchDataErrorAction(error))
        )
      )
    )
  ));

  updateUsers$ = createEffect(() => this.action$.pipe(
    ofType(ManageUserAction.UPDATE_USER),
    switchMap((data: any) =>
      this.service.updateUser(data.user).pipe(
        map((results : ResponseDatas) => {
          return new ManageUserAction.UpdateUsersSuccessAction();
        }),
        catchError(error =>
          of(new ManageUserAction.FetchDataErrorAction(error))
        )
      )
    )
  ));
}
