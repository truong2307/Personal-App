import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { GetQuizzTopicsAction } from 'src/stores/quizz-topic/quizz-topic.action';
import { quizzTopicSelector } from 'src/stores/quizz-topic/quizz-topic.selector';

@Component({
  selector: 'app-quizz-manage',
  templateUrl: './quizz-manage.component.html',
  styleUrls: ['./quizz-manage.component.scss']
})
export class QuizzManageComponent implements OnInit {

  multipleChoices : any = [
    {
      key : 1,
     title : 'Answer A',
     value : 'answerA'
    },
    {
      key : 2,
      title : 'Answer B',
      value : 'answerB'
    },
    {
      key : 1,
      title : 'Answer C',
      value : 'answerC'
    },
    {
      key : 4,
      title : 'Answer D',
      value : 'answerD'

    }
  ];

  createQuizzForm! : FormGroup;
  multiplechoiceQuestion! : FormGroup;
  topicList! : any;

  constructor(
    private formBuilder : FormBuilder,
    private store : Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetQuizzTopicsAction(0,10));

    this.store.pipe(select(quizzTopicSelector)).subscribe(
        result => {
          this.topicList = result.items;
        }
      );

    this.initialForm();
  }

  initialForm(){
    //Quizz form
    this.createQuizzForm = this.formBuilder.group({
      title : ['', [Validators.required]],
      examTime : ['', [Validators.required, Validators.min(1)]],
      topicId : ['', [Validators.required]],
      level : ['Easy', [Validators.required]],
      isPublic : false,
      multiplechoiceQuestions : this.formBuilder.array([this.multiplechoiceQuestion = this.createMultipleChoiceForm()])
    })
  }

  createMultipleChoiceForm() : FormGroup{
    return this.formBuilder.group({
      questionText : ['', [Validators.required]],
      questionImage : '',
      answerA : ['', [Validators.required]],
      answerB : ['', [Validators.required]],
      answerC : ['', [Validators.required]],
      answerD : ['', [Validators.required]],
      correctAnswer : [1, [Validators.required]],
      mark : ['', [Validators.required]],
    })
  }

get title(){
  return this.createQuizzForm.get('title');
}

get examTime(){
  return this.createQuizzForm.get('examTime');
}

get multiplechoiceQuestions(){
  return this.createQuizzForm.get('multiplechoiceQuestions') as FormArray;
}

getFormControlMultipleChoice(curIndex : number, nameControl : string){
  return this.multiplechoiceQuestions.controls[curIndex].get(nameControl);
}

addFormQuestion(){
  this.multiplechoiceQuestions.push(this.createMultipleChoiceForm());
}

removeMultipleQuestion(index : number){
  this.multiplechoiceQuestions.removeAt(index);
}

submit(){
  console.log(this.createQuizzForm);
}

}
