import { QuizzTopic } from "src/shared/model/quizz-topic.interface";

export interface QuizzTopicState {
  items: QuizzTopic[];
  totalItem: number;
  error?: string;
}
