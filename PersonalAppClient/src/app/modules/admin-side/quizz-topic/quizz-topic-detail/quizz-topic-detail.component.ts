import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { QuizzTopic } from 'src/shared/model/quizz-topic';
import { CreateQuizzTopicsAction, UpdateQuizzTopicsAction } from 'src/stores/quizz-topic/quizz-topic.action';

@Component({
  selector: 'app-quizz-topic-detail',
  templateUrl: './quizz-topic-detail.component.html',
  styleUrls: ['./quizz-topic-detail.component.scss']
})
export class QuizzTopicDetailComponent implements OnInit {

  addQuizzTopicForm!: FormGroup;
  @Input() quizzTopic! : QuizzTopic;
  @Input() isEdit = false;
  title : string = '';


  constructor(
    private activeModalService: NgbActiveModal,
    private store: Store,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.initialForm();
    this.title = this.translate.instant('quizz.CreateTopic');

    if(this.isEdit){
      this.title = this.translate.instant('quizz.EditTopic');
      this.name?.setValue(this.quizzTopic.name);
      this.id?.setValue(this.quizzTopic.id);
    }
  }

  initialForm (){
    this.addQuizzTopicForm = new FormGroup({
      name : new FormControl("",[Validators.required]),
      id : new FormControl(""),
    })
  }

  get name(){
    return this.addQuizzTopicForm.get('name');
  }

  get id(){
    return this.addQuizzTopicForm.get('id');
  }

  closeModal(){
    this.activeModalService.dismiss();
  }

  createTopic(){
    const quizzTopic : QuizzTopic = {
      name : this.addQuizzTopicForm.value.name
    };
    this.store.dispatch(new CreateQuizzTopicsAction(quizzTopic));
    this.activeModalService.close();
  }

  editTopic(){
    const quizzTopic : QuizzTopic = {
      name : this.addQuizzTopicForm.value.name,
      id : this.addQuizzTopicForm.value.id
    };
    this.store.dispatch(new UpdateQuizzTopicsAction(quizzTopic));
    this.activeModalService.close();
  }

}
