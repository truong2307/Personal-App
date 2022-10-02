import { QuizzManage } from "src/shared/model/quizz-manage";

export interface QuizzManageState {
  items: QuizzManage[];
  item: QuizzManage;
  totalItem: number;
  error?: string;
}
