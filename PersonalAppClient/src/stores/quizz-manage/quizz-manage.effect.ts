import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { QuizzManageService } from 'src/services/quizz-manage.service';
import { QuizzManage } from 'src/shared/model/quizz-manage.interface';
import { ResponseData, ResponseDatas } from 'src/shared/model/response-data.interface';

import * as QuizzManageAction from "./quizz-manaage.action"
import { quizzManageSelector } from './quizz-manage.selector';

@Injectable()
export class QuizzManageEffects {

//#region Field

quizzList!: QuizzManage[]
totalItem: number = 0;

//#endregion

//#region constructor

  constructor(
    private action$: Actions,
    private store: Store,
    private loader: NgxUiLoaderService,
    private service : QuizzManageService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {
    this.store.pipe(select(quizzManageSelector)).subscribe(
      result => {
        this.quizzList = result.items.map((c: any) => ({...c}));
        this.totalItem = result.totalItem;
      }
    );
  }

//#endregion

//#region Effect

getQuizzs$ = createEffect(() => this.action$.pipe(
  ofType(QuizzManageAction.GET_ALL_QUIZZ),
  switchMap((payLoad: any) => {
    this.loader.start();
    return this.service.getQuizzs(payLoad.pageIndex, payLoad.pageSize).pipe(
      map((result: ResponseDatas) => {
        return new QuizzManageAction.CrudQuizzSuccessAction(result.datas, result.totalItem as number);
      }),
      catchError(error =>
        of(new QuizzManageAction.CrudQuizzFailedAction(error)))
    )
  })
));

createQuizz$ = createEffect(() => this.action$.pipe(
  ofType(QuizzManageAction.CREATE_QUIZZ),
  switchMap((payLoad: any) => {
    this.loader.start();
    return this.service.createQuizz(payLoad.payLoad).pipe(
      map((result : ResponseData) => {
        if(result.isSuccess){
          this.toastr.success(
            'Success'
          );
          this.quizzList.push(result.result);
        }
        return new QuizzManageAction.CrudQuizzSuccessAction(this.quizzList, this.totalItem + 1 as number);
      }),
      catchError(error =>
        of(new QuizzManageAction.CrudQuizzFailedAction(error)))
    )
  })
))

updateQuizz$ = createEffect(() => this.action$.pipe(
  ofType(QuizzManageAction.UPDATE_QUIZZ),
  switchMap((payLoad: any) => {
    this.loader.start();

    return this.service.updateQuizz(payLoad.payLoad).pipe(
      map((result: ResponseData) => {
        var curIndex = this.quizzList.findIndex(c => c.id == payLoad.payLoad.id);
        this.quizzList[curIndex] = result.result;
        return new QuizzManageAction.CrudQuizzSuccessAction(this.quizzList, this.totalItem + 1 as number);
      }),
      catchError(error =>
        of(new QuizzManageAction.CrudQuizzFailedAction(error)))
    )
  })
))

removeQuizz$ = createEffect(() => this.action$.pipe(
  ofType(QuizzManageAction.DELETE_QUIZZ),
  switchMap((payLoad : any) => {
    this.loader.start();
    return this.service.removeQuizz(payLoad.id).pipe(
      map((result: ResponseData) => {
        if(result.isSuccess){
          this.toastr.error(
            'Success'
          );
          var curIndex = this.quizzList.findIndex(c => c.id == payLoad.id);
        this.quizzList.splice(curIndex, 1);
        }
        return new QuizzManageAction.CrudQuizzSuccessAction(this.quizzList, this.totalItem - 1);
      }),
      catchError(error =>
        of(new QuizzManageAction.CrudQuizzFailedAction(error)))
    )
  })
))

crudQuizzSuccess$ = createEffect(() => this.action$.pipe(
  ofType(QuizzManageAction.CRUD_QUIZZ_SUCCESS),
  tap(() => {
    this.loader.stop();
  })
),
  { dispatch: false }
);

crudQuizzFailed$ = createEffect(() => this.action$.pipe(
  ofType(QuizzManageAction.CRUD_QUIZZ_FAILED),
  tap((error : any) => {
    this.loader.stop();
    this.toastr.error(
        this.translate.instant('common.Error')
    );
  })
),
  { dispatch: false }
);

  //#endregion
}
