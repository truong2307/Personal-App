import { QuizzTopic } from "src/shared/model/quizz-topic";

export interface QuizzTopicState {
  items: QuizzTopic[];
  totalItem: number;
  error?: string;
}
