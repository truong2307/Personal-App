import { QuizzManage } from "src/shared/model/quizz-manage.interface";

export interface QuizzManageState {
  items: QuizzManage[];
  item: QuizzManage;
  totalItem: number;
  error?: string;
}
