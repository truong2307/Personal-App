import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { MasterDataService } from "src/services/master-data.service";
import { ResponseData, ResponseDatas } from "src/shared/model/response-data.interface";
import { quizzTopicSelector } from "./quizz-topic.selector";

import * as QuizzTopicAction from "./quizz-topic.action"
import { QuizzTopic } from "src/shared/model/quizz-topic.interface";

@Injectable()
export class ManageUserEffects {

  quizzTopics!: Array<QuizzTopic>;
  totalItem: number = 0;

  constructor(
    private action$: Actions,
    private store: Store,
    private loader: NgxUiLoaderService,
    private service : MasterDataService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {
    this.store.pipe(select(quizzTopicSelector)).subscribe(
      result => {
        this.quizzTopics = result.items.map((c: any) => ({...c}));
        this.totalItem = result.totalItem;
      }
    );
  }

  getQuizzTopics$ = createEffect(() => this.action$.pipe(
    ofType(QuizzTopicAction.GET_QUIZZ_TOPICS),
    switchMap((payLoad: any) => {
      this.loader.start();
      return this.service.getQuizzTopics(payLoad.pageIndex, payLoad.pageSize).pipe(
        map((result: ResponseDatas) => {
          return new QuizzTopicAction.CrudQuizzTopicsSuccessAction(result.datas, result.totalItem as number);
        }),
        catchError(error =>
          of(new QuizzTopicAction.CrudQuizzTopicsFailedAction(error))
          )
      )
    })
  ))

  deleteQuizzTopic$ = createEffect(() => this.action$.pipe(
    ofType(QuizzTopicAction.DELETE_QUIZZ_TOPIC),
    switchMap((data : any) => {

        return this.service.deleteQuizzTopics(data.payload).pipe(
          map((result: ResponseData) => {
            if(result.isSuccess){
              this.toastr.error(
                this.translate.instant('common.Success')
              );
              var curIndex = this.quizzTopics.findIndex(c => c.id == data.payload);
              this.quizzTopics.splice(curIndex, 1);
            }
            return new QuizzTopicAction.CrudQuizzTopicsSuccessAction(this.quizzTopics, this.totalItem - 1);
          }),
          catchError(error =>
            of(new QuizzTopicAction.CrudQuizzTopicsFailedAction(error))
            )
        )
    })
  ))

  createQuizzTopic$ = createEffect(() => this.action$.pipe(
    ofType(QuizzTopicAction.CREATE_QUIZZ_TOPIC),
    switchMap((data : any) => {
        return this.service.createQuizzTopics(data.payLoad).pipe(
          map((result: ResponseData) => {
            if(result.isSuccess){
              this.toastr.success(
                this.translate.instant('common.Success')
              );
              this.quizzTopics.push(result.result);
            }
            return new QuizzTopicAction.CrudQuizzTopicsSuccessAction(this.quizzTopics, this.totalItem + 1);
          }),
          catchError(error =>
            of(new QuizzTopicAction.CrudQuizzTopicsFailedAction(error.error))
            )
        )
    })
  ))

  updateQuizzTopic$ = createEffect(() => this.action$.pipe(
    ofType(QuizzTopicAction.UPDATE_QUIZZ_TOPIC),
    switchMap((data : any) => {
        return this.service.updateQuizzTopics(data.payLoad).pipe(
          map((result: ResponseData) => {
            if(result.isSuccess){
              this.toastr.success(
                this.translate.instant('common.Success')
              );
              var curIndex = this.quizzTopics.findIndex(c => c.id == data.payLoad.id);
              this.quizzTopics[curIndex].name = data.payLoad.name;
            }
            return new QuizzTopicAction.CrudQuizzTopicsSuccessAction(this.quizzTopics, this.totalItem);
          }),
          catchError(error =>
            of(new QuizzTopicAction.CrudQuizzTopicsFailedAction(error.error))
            )
        )
    })
  ))

  crudQuizzTopicSuccess$ = createEffect(() => this.action$.pipe(
    ofType(QuizzTopicAction.CRUD_QUIZZ_TOPIC_SUCCESS),
    tap(() => {
      this.loader.stop();
    })
  ),
    { dispatch: false }
  );

  crudQuizzTopicFailed$ = createEffect(() => this.action$.pipe(
    ofType(QuizzTopicAction.CRUD_QUIZZ_TOPIC_FAILED),
    tap((error : any) => {
      this.loader.stop();
      this.toastr.error(
        this.translate.instant('common.Error')
      );
    })
  ),
    { dispatch: false }
  );

}
