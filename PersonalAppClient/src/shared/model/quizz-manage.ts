import { QuizzTopic } from "./quizz-topic";

export class QuizzManage {
  id!: number;
  title!: string;
  examTime! : number;
  level! : number;
  imageUrl! : string;
  topicId! : number;
  quizzTopic! : QuizzTopic;
  isPublic! : boolean;
  multipleChoiceQuestions! : QuizzMultipleChoiceQuestion[];
  essayQuestions! : QuizzEssayQuestion[];
}

export class QuizzMultipleChoiceQuestion{
  id!: number;
  quizzId! : number;
  questionText! : string;
  questionImage! : string;
  answerA! : string;
  answerB! : string;
  answerC! : string;
  answerD! : string;
  correctAnswer! : string;
  mark! : number;
}

export class QuizzEssayQuestion{
  id!: number;
  quizzId! : number;
  questionText! : string;
  questionImage! : string;
  correctAnswer! : string;
  mark! : number;
}
