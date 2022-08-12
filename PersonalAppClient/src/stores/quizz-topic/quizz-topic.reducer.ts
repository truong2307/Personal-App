
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
    default:
      return state;
  }
}
