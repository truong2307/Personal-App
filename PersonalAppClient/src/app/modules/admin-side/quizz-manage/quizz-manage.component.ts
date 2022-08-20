import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quizz-manage',
  templateUrl: './quizz-manage.component.html',
  styleUrls: ['./quizz-manage.component.scss']
})
export class QuizzManageComponent implements OnInit {

  createQuizzForm! : FormGroup;
  multiplechoiceQuestion! : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(){
    //Multiple choice question form
    this.multiplechoiceQuestion = this.formBuilder.group({
      questionText : ['', [Validators.required]],
      questionImage : '',
      answerA : ['', [Validators.required]],
      answerB : ['', [Validators.required]],
      answerC : ['', [Validators.required]],
      answerD : ['', [Validators.required]],
      correctAnswer : ['', [Validators.required]],
      mark : ['', [Validators.required]],
    })

    //Quizz form
    this.createQuizzForm = this.formBuilder.group({
      title : ['', [Validators.required]],
      examTime : ['', [Validators.required, Validators.min(1)]],
      topicId : ['saab', [Validators.required]],
      level : ['Hard', [Validators.required]],
      isPublic : false,
      multiplechoiceQuestions : this.formBuilder.array([this.multiplechoiceQuestion])
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

get questionText(){
  return this.multiplechoiceQuestion.get('questionText') as FormArray;
}

addFormQuestion(){
  this.multiplechoiceQuestions.push(this.multiplechoiceQuestion);
}

submit(){

}

}
