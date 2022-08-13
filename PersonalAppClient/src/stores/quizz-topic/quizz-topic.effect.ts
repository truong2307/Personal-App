import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { MasterDataService } from "src/services/master-data.service";
import { ResponseDatas } from "src/shared/model/response-data.interface";
import { quizzTopicSelector } from "./quizz-topic.selector";

import * as QuizzTopicAction from "./quizz-topic.action"
import { QuizzTopic } from "src/shared/model/quizz-topic.interface";

@Injectable()
export class ManageUserEffects {

  quizzTopics: Array<QuizzTopic> = [];

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
        this.quizzTopics = result.items.map((c: any) => ({...c}))
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
    tap(() => {
      this.loader.stop();
      this.toastr.error(
        this.translate.instant('common.Error')
      );
    })
  ),
    { dispatch: false }
  );

}
