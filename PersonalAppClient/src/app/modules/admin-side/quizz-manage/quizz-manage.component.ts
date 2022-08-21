import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { select, Store } from '@ngrx/store';
import { QuizzTypeArrayForm } from 'src/shared/constants/quizz-create';
import { GetQuizzTopicsAction } from 'src/stores/quizz-topic/quizz-topic.action';
import { quizzTopicSelector } from 'src/stores/quizz-topic/quizz-topic.selector';

@Component({
  selector: 'app-quizz-manage',
  templateUrl: './quizz-manage.component.html',
  styleUrls: ['./quizz-manage.component.scss']
})
export class QuizzManageComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
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
  topicList! : any;
  quizzTypeFormArr : any = QuizzTypeArrayForm;

  constructor(
    private formBuilder : FormBuilder,
    private store : Store,
  ) { }

  ngOnInit(): void {
    this.initialForm();
    this.store.dispatch(new GetQuizzTopicsAction(0,10));
    this.store.pipe(select(quizzTopicSelector)).subscribe(
        result => {
          this.topicList = result.items;
        }
      );
  }

  initialForm(){
    //Quizz form
    this.createQuizzForm = this.formBuilder.group({
      title : ['', [Validators.required]],
      examTime : ['', [Validators.required, Validators.min(1)]],
      topicId : ['', [Validators.required]],
      level : ['Easy', [Validators.required]],
      isPublic : false,
      multiplechoiceQuestions : this.formBuilder.array([this.createMultipleChoiceForm()]),
      essayQuestions : this.formBuilder.array([this.createEssayQuestion()])
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

  createEssayQuestion() : FormGroup{
    return this.formBuilder.group({
      questionText : ['', [Validators.required]],
      questionImage : '',
      correctAnswer : ["", [Validators.required]],
      mark : ['', [Validators.required]],
    });
  }

  get title(){
    return this.createQuizzForm.get('title');
  }

  get examTime(){
    return this.createQuizzForm.get('examTime');
  }

  get topicId(){
    return this.createQuizzForm.get('topicId');
  }

  get multiplechoiceQuestions(){
    return this.createQuizzForm.get('multiplechoiceQuestions') as FormArray;
  }

  get essayQuestions(){
    return this.createQuizzForm.get('essayQuestions') as FormArray;
  }

  getFormControl(curIndex : number, nameControl : string, mode : Number){
    if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error('Mode '+ mode +' is not exists in enum QuizzTypeArrayForm');
    var formArr = mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS ? this.multiplechoiceQuestions : this.essayQuestions;
    return formArr.controls[curIndex].get(nameControl);
  }

  addFormQuestion(mode : Number){
    if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error('Mode '+ mode +' is not exists in enum QuizzTypeArrayForm');
    if(mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS){
      this.multiplechoiceQuestions.push(this.createMultipleChoiceForm());
    }
    else{
      this.essayQuestions.push(this.createEssayQuestion());
    }
  }

  removeMultipleQuestion(index : number, mode : Number){
    if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error('Mode '+ mode +' is not exists in enum QuizzTypeArrayForm');

    var formArr = mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS ? this.multiplechoiceQuestions : this.essayQuestions;
    formArr.removeAt(index);
  }

  submit(){
    console.log(this.createQuizzForm);
  }

}
