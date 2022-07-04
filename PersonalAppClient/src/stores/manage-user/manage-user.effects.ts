import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ManageUserService } from "src/services/manage-user.service";
import { ResponseDatas } from "src/shared/model/ResponseData.interface";
import { catchError, map, of, switchMap } from "rxjs";

import * as ManageUserAction from "./manage-user.action"

@Injectable()
export class ManageUserEffects {


  constructor(
    private action$: Actions,
    private service : ManageUserService
    ){
  }

  getUsers$ = createEffect(() => this.action$.pipe(
    ofType(ManageUserAction.GET_USERS),
    switchMap(() =>
      this.service.getUsers().pipe(
        map((results : ResponseDatas) => {
          return new ManageUserAction.GetUsersSuccessAction(results.datas);
        }),
        catchError(error =>
          of(new ManageUserAction.FetchDataErrorAction(error))
        )
      )
    )
  ));
}
