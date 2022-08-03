import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ManageUserService } from "src/services/manage-user.service";
import { ResponseDatas } from "src/shared/model/ResponseData.interface";
import { catchError, map, of, switchMap, tap } from "rxjs";

import * as ManageUserAction from "./manage-user.action"
import { select, Store } from "@ngrx/store";
import { manageUserSelector } from './manage-user.selector';
import { UserForAdminManagerDto } from "src/shared/model/User.interface";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ManageUserEffects {

  userData: Array<UserForAdminManagerDto> = [];

  constructor(
    private action$: Actions,
    private store: Store,
    private service : ManageUserService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private translate: TranslateService,
    ){
      this.store.pipe(select(manageUserSelector)).subscribe(
        result => {
          this.userData = result.items.map((c: any) => ({...c}))
        }
      );
  }

  getUsers$ = createEffect(() => this.action$.pipe(
    ofType(ManageUserAction.GET_USERS),
    switchMap((data : any) => {
        this.loader.start();
        return this.service.getUsers(data.payload.pageIndex, data.payload.pageSize).pipe(
          map((results : ResponseDatas) => {
            return new ManageUserAction.GetUsersSuccessAction(results.datas, results.totalItem);
          }),
          catchError(error =>
            of(new ManageUserAction.FetchDataErrorAction(error))
          )
        )
    }

    )
  ));

  updateUsers$ = createEffect(() => this.action$.pipe(
    ofType(ManageUserAction.UPDATE_USER),
    switchMap((data: any) =>
      this.service.updateUser(data.user).pipe(
        map((results : ResponseDatas) => {
          var index = this.userData.findIndex(c => c.userId === data.user.userId);
          this.userData[index].role = data.user.role;
          return new ManageUserAction.UpdateUsersSuccessAction(this.userData);
        }),
        catchError(error =>
          of(new ManageUserAction.FetchDataErrorAction(error))
        )
      )
    )
  ));

  fetchDataErrorAction$ = createEffect(() => this.action$.pipe(
    ofType(ManageUserAction.FETCH_DATA_ERROR),
    tap((error) => {
      this.loader.stop();
      this.toastr.error(
        this.translate.instant('common.Error')
      );
    })
  ),
    { dispatch: false }
  );

  getUsersSuccessAction$ = createEffect(() => this.action$.pipe(
    ofType(ManageUserAction.GET_USERS_SUCCESS),
    tap((error) => {
      this.loader.stop();
    })
  ),
    { dispatch: false }
  );
}
