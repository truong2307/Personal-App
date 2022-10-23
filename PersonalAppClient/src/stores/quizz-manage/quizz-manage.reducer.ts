import { QuizzManageState } from "./quizz-manage.state";
import  * as QuizzManageAction from "./quizz-manaage.action";

const initialState : QuizzManageState = {
  items: [],
  item: {
      id: 0,
      title: '',
      examTime: 0,
      level: 0,
      imageUrl: '',
      quizzTopic : {},
      topicId: 0,
      isPublic : false,
      multipleChoiceQuestions: [],
      essayQuestions: [],
  },
  error : '',
  totalItem: 0,
};

export function quizzManageReducer(
  state: QuizzManageState = initialState,
  action: QuizzManageAction.QuizzManageAction
): QuizzManageState {
  switch (action.type) {
    case QuizzManageAction.CRUD_QUIZZ_SUCCESS:
      return {...state, item: action.item, items: action.payLoad, totalItem: action.totalItem}
      case QuizzManageAction.CRUD_QUIZZ_FAILED:
        return {...state, error: action.error}
    default:
      return state;
  }
}
