import { Action } from "@ngrx/store";
import { QuizzTopic } from "src/shared/model/quizz-topic.interface";

export const GET_QUIZZ_TOPICS = 'GET_QUIZZ_TOPICS';
export const CREATE_QUIZZ_TOPIC = 'CREATE_QUIZZ_TOPIC';
export const UPDATE_QUIZZ_TOPIC = 'UPDATE_QUIZZ_TOPIC';
export const DELETE_QUIZZ_TOPIC = 'DELETE_QUIZZ_TOPIC';
export const CRUD_QUIZZ_TOPIC_SUCCESS = 'CRUD_QUIZZ_TOPIC_SUCCESS';
export const CRUD_QUIZZ_TOPIC_FAILED = 'CRUD_QUIZZ_TOPIC_FAILED';

export class GetQuizzTopicsAction implements Action {
  readonly type = GET_QUIZZ_TOPICS;
  constructor(public pageIndex: number, public pageSize: number){};
}

export class CreateQuizzTopicsAction implements Action {
  readonly type = CREATE_QUIZZ_TOPIC;
  constructor(public payLoad: QuizzTopic){};
}

export class UpdateQuizzTopicsAction implements Action {
  readonly type = UPDATE_QUIZZ_TOPIC;
  constructor(public payLoad: QuizzTopic){};
}

export class DeleteQuizzTopicsAction implements Action {
  readonly type = DELETE_QUIZZ_TOPIC;
  constructor(public payload: number){};
}

export class CrudQuizzTopicsSuccessAction implements Action {
  readonly type = CRUD_QUIZZ_TOPIC_SUCCESS;
  constructor(public items: QuizzTopic[], public totalItem: number){};
}

export class CrudQuizzTopicsFailedAction implements Action {
  readonly type = CRUD_QUIZZ_TOPIC_FAILED;
  constructor(public error: any){};
}


export type QuizzTopicAction =
| GetQuizzTopicsAction
| CreateQuizzTopicsAction
| UpdateQuizzTopicsAction
| DeleteQuizzTopicsAction
| CrudQuizzTopicsSuccessAction
| CrudQuizzTopicsFailedAction
