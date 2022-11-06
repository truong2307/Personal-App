import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from 'src/services/master-data.service';
import message from 'src/shared/constants/message';
import { QuizzTypeArrayForm } from 'src/shared/constants/quizz-create';
import { QuizzEssayQuestion, QuizzManage, QuizzMultipleChoiceQuestion } from 'src/shared/model/quizz-manage';
import { ResponseDatas } from 'src/shared/model/response-data';
import { CreateQuizzAction, GetQuizzAction, UpdateQuizzAction } from 'src/stores/quizz-manage/quizz-manaage.action';
import { quizzManageSelector } from 'src/stores/quizz-manage/quizz-manage.selector';
@Component({
  selector: 'app-quizz-edit',
  templateUrl: './quizz-edit.component.html',
  styleUrls: ['./quizz-edit.component.scss']
})
export class QuizzEditComponent implements OnInit {

//#region Fields

  @Input() curIdQuizz : number = -1;
  @Input() isEdit : boolean = false;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @Output() displayForm = new EventEmitter();

  initialQuizz!: QuizzManage;

  multipleChoices : any = [
    {
      key : 1,
      title : 'A',
      value : 'answerA'
    },
    {
      key : 2,
      title : 'B',
      value : 'answerB'
    },
    {
      key : 3,
      title : 'C',
      value : 'answerC'
    },
    {
      key : 4,
      title : 'D',
      value : 'answerD'
    }
  ];

  imageSrc: string = '';
  createQuizzForm! : FormGroup;
  topicList! : any;
  quizzTypeFormArr : any = QuizzTypeArrayForm;
  quizzData! : QuizzManage;

  get title(){
    return this.createQuizzForm.get('title');
  }

  get examTime(){
    return this.createQuizzForm.get('examTime');
  }

  get topicId(){
    return this.createQuizzForm.get('topicId');
  }

  get imageQuizz(){
    return this.createQuizzForm.get('imageQuizz');
  }

  get multipleChoiceQuestions(){
    return this.createQuizzForm.get('multipleChoiceQuestions') as FormArray;
  }

  get essayQuestions(){
    return this.createQuizzForm.get('essayQuestions') as FormArray;
  }

//#endregion

//#region constructor

constructor(
  private store : Store,
  private formBuilder : FormBuilder,
  private service : MasterDataService,
  private toastr: ToastrService,
  private translate: TranslateService,
) { }

//#endregion

//#region method

ngOnInit(): void {
  if(this.isEdit){
    this.store.dispatch(new GetQuizzAction(this.curIdQuizz));
    this.store.pipe(select(quizzManageSelector)).subscribe((result) => {
      this.initialQuizz = result.item;
      this.imageSrc = this.initialQuizz?.imageUrl;
      this.initialForm(this.initialQuizz);
    });
  }

  this.initialForm();
  this.service.getAllQuizzTopics().subscribe((result : ResponseDatas) => {
    this.topicList = result.datas;
  }
  ,() => {
    this.toastr.error(
      this.translate.instant('common.Error')
    )
  }
  )
}

initialForm(initialValue? : QuizzManage){
  //Quizz form
  this.createQuizzForm = this.formBuilder.group({
    id : [initialValue ? initialValue.id : -1],
    title : [initialValue?.title, [Validators.required]],
    examTime : [initialValue?.examTime, [Validators.required, Validators.min(1)]],
    topicId : [initialValue?.topicId, [Validators.required]],
    level : [initialValue?.level.toString(), [Validators.required]],
    isPublic : initialValue? initialValue.isPublic : false,
    imageQuizz : '',
    multipleChoiceQuestions : this.formBuilder.array([]),
    essayQuestions : this.formBuilder.array([])
  })

  if(initialValue){
    initialValue?.multipleChoiceQuestions?.forEach(item => {
      (this.createQuizzForm.controls['multipleChoiceQuestions'] as FormArray)
                                    .push(this.createMultipleChoiceForm(item));

    })
    initialValue?.essayQuestions?.forEach(item => {
      (this.createQuizzForm.controls['essayQuestions'] as FormArray)
                                    .push(this.createEssayQuestion(item));
    })
  } else {
    (this.createQuizzForm.controls['multipleChoiceQuestions'] as FormArray)
                                                          .push(this.createMultipleChoiceForm());
    (this.createQuizzForm.controls['essayQuestions'] as FormArray)
                                                          .push(this.createEssayQuestion())
  }
}

createMultipleChoiceForm(initValue?: QuizzMultipleChoiceQuestion) : FormGroup{
  return this.formBuilder.group({
    id : [initValue ? initValue.id : 0],
    questionText : [initValue?.questionText, [Validators.required]],
    questionImage : '',
    answerA : [initValue?.answerA, [Validators.required]],
    answerB : [initValue?.answerB, [Validators.required]],
    answerC : [initValue?.answerC, [Validators.required]],
    answerD : [initValue?.answerD, [Validators.required]],
    correctAnswer : [initValue?.correctAnswer, [Validators.required]],
    mark : [initValue?.mark, [Validators.required]],
    createdAt : [(initValue as any)?.createdAt],
    createdBy : [(initValue as any)?.createdBy],
    quizzId : [initValue?.quizzId],
  })
}

createEssayQuestion(initValue?: QuizzEssayQuestion) : FormGroup{
  return this.formBuilder.group({
    id : [initValue ? initValue.id : 0],
    questionText : [initValue?.questionText, [Validators.required]],
    questionImage : '',
    correctAnswer : [initValue?.correctAnswer, [Validators.required]],
    mark : [initValue?.mark, [Validators.required]],
    createdAt : [(initValue as any)?.createdAt],
    createdBy : [(initValue as any)?.createdBy],
    quizzId : [initValue?.quizzId],
  });
}


getFormControl(curIndex : number, nameControl : string, mode : Number){
  if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error(message.ERROR_EXISTS_ENUM.stringFormat(mode as any));
  var formArr = mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS ? this.multipleChoiceQuestions : this.essayQuestions;
  return formArr.controls[curIndex].get(nameControl);
}

addFormQuestion(mode : Number){
  if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error(message.ERROR_EXISTS_ENUM.stringFormat(mode as any));
  if(mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS){
    this.multipleChoiceQuestions.push(this.createMultipleChoiceForm());
  }
  else{
    this.essayQuestions.push(this.createEssayQuestion());
  }
}

removeQuestion(index : number, mode : Number){
  if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error(message.ERROR_EXISTS_ENUM.stringFormat(mode as any));

  var formArr = mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS ? this.multipleChoiceQuestions : this.essayQuestions;
  formArr.removeAt(index);
}

submit(){
  switch (true) {
    case this.createQuizzForm.invalid:
      this.toastr.error('Input all field before submit');
      return;
    case this.isEdit:
      console.log(this.createQuizzForm.value);

    this.store.dispatch(new UpdateQuizzAction(this.createFormData()));
    break;
    default:
      this.store.dispatch(new CreateQuizzAction(this.createFormData()));
      break;
  }

  this.backToList();
}

createFormData():FormData{
  this.quizzData = this.createQuizzForm.value;
  const formData = new FormData();
  formData.append('imageQuizz', this.imageQuizz?.value);
  for (var key in this.quizzData) {
    switch (key) {
      case 'essayQuestions':
        this.quizzData.essayQuestions.forEach((c, index) => {
          for (var key in c) {
            formData.append(`essayQuestions[${index}][${key}]`, c[key as keyof QuizzEssayQuestion]?.toString());
          }
        })
        break;
        case 'multipleChoiceQuestions':
          this.quizzData.multipleChoiceQuestions.forEach((c, index) => {
            for (var key in c) {
              formData.append(`multipleChoiceQuestions[${index}][${key}]`, c[key as keyof QuizzMultipleChoiceQuestion]?.toString());
            }
          })
          break;

      default:
        formData.append(key, this.quizzData[key as keyof QuizzManage]?.toString());
        break;
    }
  }
  return formData;
}

backToList(){
  this.displayForm.emit(false);
}

processFile(imageInput: any){
  if (imageInput.files.length === 0) return;
  const file: File = imageInput.files[0];
  //Convert bytes to Mb
  const sizeFileMb = file.size / Math.pow(1024,2);
  if(sizeFileMb > 4){
    this.toastr.error('Images must not be more than 4mb');
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.imageSrc = reader.result as string;
    this.createQuizzForm.patchValue({
      imageQuizz: file,
    });
  };
}

//#endregion
}
