
import * as QuizzTopicAction from "./quizz-topic.action"
import { QuizzTopicState } from "./quizz-topic.state";

const initialState : QuizzTopicState = {
  items: [],
  error : '',
  totalItem: 0,
};


export function quizzTopicReducer(
  state: QuizzTopicState = initialState,
  action: QuizzTopicAction.QuizzTopicAction
): QuizzTopicState {
  switch (action.type) {
    case QuizzTopicAction.CRUD_QUIZZ_TOPIC_SUCCESS:
      return {...state, items: action.items, totalItem: action.totalItem}
      case QuizzTopicAction.CRUD_QUIZZ_TOPIC_FAILED:
        return {...state, error: action.error}
    default:
      return state;
  }
}
