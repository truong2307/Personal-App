import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from 'src/services/master-data.service';
import message from 'src/shared/constants/message';
import { QuizzTypeArrayForm } from 'src/shared/constants/quizz-create';
import { ResponseDatas } from 'src/shared/model/response-data.interface';
@Component({
  selector: 'app-quizz-edit',
  templateUrl: './quizz-edit.component.html',
  styleUrls: ['./quizz-edit.component.scss']
})
export class QuizzEditComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  @Output() displayForm = new EventEmitter();
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

  constructor(
    private formBuilder : FormBuilder,
    private service : MasterDataService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
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

  get multiplechoiceQuestions(){
    return this.createQuizzForm.get('multiplechoiceQuestions') as FormArray;
  }

  get essayQuestions(){
    return this.createQuizzForm.get('essayQuestions') as FormArray;
  }

  initialForm(){
    //Quizz form
    this.createQuizzForm = this.formBuilder.group({
      title : ['', [Validators.required]],
      examTime : ['', [Validators.required, Validators.min(1)]],
      topicId : ['', [Validators.required]],
      level : ['', [Validators.required]],
      isPublic : false,
      imageQuizz : '',
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
      correctAnswer : ['', [Validators.required]],
      mark : ['', [Validators.required]],
    });
  }


  getFormControl(curIndex : number, nameControl : string, mode : Number){
    if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error(message.ERROR_EXISTS_ENUM.stringFormat(mode as any));
    var formArr = mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS ? this.multiplechoiceQuestions : this.essayQuestions;
    return formArr.controls[curIndex].get(nameControl);
  }

  addFormQuestion(mode : Number){
    if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error(message.ERROR_EXISTS_ENUM.stringFormat(mode as any));
    if(mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS){
      this.multiplechoiceQuestions.push(this.createMultipleChoiceForm());
    }
    else{
      this.essayQuestions.push(this.createEssayQuestion());
    }
  }

  removeMultipleQuestion(index : number, mode : Number){
    if(!Object.values(QuizzTypeArrayForm).includes(mode as any)) throw new Error(message.ERROR_EXISTS_ENUM.stringFormat(mode as any));

    var formArr = mode === QuizzTypeArrayForm.MULTIPLE_CHOICE_QUESTIONS ? this.multiplechoiceQuestions : this.essayQuestions;
    formArr.removeAt(index);
  }

  submit(){
    if(this.createQuizzForm.invalid){
      this.toastr.error('Input all field before submit');
      return;
    }
    console.log(this.createQuizzForm.value);

    const formData = new FormData();
    formData.append('file', this.imageQuizz?.value);
    console.log(formData);
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

}
