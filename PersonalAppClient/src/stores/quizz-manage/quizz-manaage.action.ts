import { Action } from "@ngrx/store";
import { QuizzManage } from "src/shared/model/quizz-manage.interface";


export const GET_ALL_QUIZZ = 'GET_ALL_QUIZZ';
export const GET_QUIZZ = 'GET_QUIZZ';
export const CREATE_QUIZZ = 'CREATE_QUIZZ';
export const UPDATE_QUIZZ = 'UPDATE_QUIZZ';
export const DELETE_QUIZZ = 'DELETE_QUIZZ';
export const CRUD_QUIZZ_SUCCESS = 'CRUD_QUIZZ_SUCCESS';
export const CRUD_QUIZZ_FAILED = 'CRUD_QUIZZ_FAILED';


export class GetAllQuizzAction implements Action {
   readonly type = GET_ALL_QUIZZ;
   constructor(public pageIndex: number, public pageSize: number){ }
}

export class GetQuizzAction implements Action {
  readonly type = GET_QUIZZ;
  constructor(public payLoad: number){ }
}

export class CreateQuizzAction implements Action {
  readonly type = CREATE_QUIZZ;
  constructor(public payLoad: QuizzManage){ }
}

export class UpdateQuizzAction implements Action {
  readonly type = UPDATE_QUIZZ;
  constructor(public payLoad: QuizzManage){ }
}

export class DeleteQuizzAction implements Action {
  readonly type = DELETE_QUIZZ;
  constructor(public id: Number){ }
}

export class CrudQuizzSuccessAction implements Action {
  readonly type = CRUD_QUIZZ_SUCCESS;
  constructor(public payLoad: QuizzManage[], public totalItem: number){ }
}

export class CrudQuizzFailedAction implements Action {
  readonly type = CRUD_QUIZZ_FAILED;
  constructor(public error: any){ }
}

export type QuizzManageAction =
| GetAllQuizzAction
| GetQuizzAction
| CreateQuizzAction
| UpdateQuizzAction
| DeleteQuizzAction
| CrudQuizzSuccessAction
| CrudQuizzFailedAction
