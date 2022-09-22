import { QuizzTopic } from "./quizz-topic.interface";

export interface QuizzManage {
  id: number,
  title: string,
  examTime : number,
  level : number,
  imageUrl : string,
  quizzTopic : QuizzTopic,
  isPublic : boolean,
  multipleChoiceQuestions : QuizzMultipleChoiceQuestion[],
  essayQuestions : QuizzEssayQuestion[],
}

export interface QuizzMultipleChoiceQuestion{
  id: number,
  quizzId : number,
  questionText : string,
  questionImage : string,
  answerA : string,
  answerB : string,
  answerC : string,
  answerD : string,
  correctAnswer : string,
  mark : number,
}

export interface QuizzEssayQuestion{
  id: number,
  quizzId : number,
  questionText : string,
  questionImage : string,
  correctAnswer : string,
  mark : number,
}
