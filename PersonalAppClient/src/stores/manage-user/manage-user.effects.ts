import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ManageUserService } from "src/services/manage-user.service";
import { ResponseDatas } from "src/shared/model/ResponseData.interface";
import { catchError, map, of, switchMap } from "rxjs";

import * as ManageUserAction from "./manage-user.action"
import { select, Store } from "@ngrx/store";
import { manageUserSelector } from './manage-user.selector';

@Injectable()
export class ManageUserEffects {

  pageSize = 10;
  pageIndex = 0;

  constructor(
    private action$: Actions,
    private store: Store,
    private service : ManageUserService
    ){
      this.store.pipe(select(manageUserSelector)).subscribe(
        result => {
          this.pageIndex = result.pageIndex;
          this.pageSize = result.pageSize;
        }
      );
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
          return new ManageUserAction.GetUsersAction({pageIndex :this.pageIndex, pageSize: this.pageSize});
        }),
        catchError(error =>
          of(new ManageUserAction.FetchDataErrorAction(error))
        )
      )
    )
  ));
}
