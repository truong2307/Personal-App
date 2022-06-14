import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { EventCalendar } from 'src/shared/model/Event.interface';

import { CreateEventAction, DeleteEventAction, UpdateEventAction } from 'src/stores/events/events.action';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  colorInit : string[] = [];
  currentColor: string = '';
  addEventForm!: FormGroup;
  initialDate: string = '';
  reBuildTime!: Date;
  isEdit: boolean = false;
  initialEvent!: EventCalendar;

  constructor(
     private activeModalService: NgbActiveModal,
     private store: Store,
     ) { }

  ngOnInit(): void {
    var currDate = (new Date())
    this.reBuildTime = new Date(this.initialDate);
    this.reBuildTime.setHours(currDate.getHours());
    this.reBuildTime.setMinutes(currDate.getMinutes());
    this.reBuildTime.setSeconds(currDate.getSeconds());
    this.initialForm();
    this.colorInit = ['#fa9891','#face91','#c4fa91', '#aee8f2'];

    if(this.isEdit){
      this.title?.setValue(this.initialEvent.title);
      this.description?.setValue(this.initialEvent.description);
      this.startDate?.setValue(this.initialEvent.startDate);
      this.endDate?.setValue(this.initialEvent.endDate);
      this.color?.setValue(this.initialEvent.color);
    }
  }

  initialForm (){
    this.addEventForm = new FormGroup({
      title : new FormControl('', [Validators.required,]),
      description : new FormControl('', [Validators.required,]),
      startDate : new FormControl(this.reBuildTime, [Validators.required,]),
      endDate : new FormControl(this.reBuildTime, [Validators.required,]),
      color: new FormControl('', [Validators.required,])
    })
  }

  get title(){
    return this.addEventForm.get('title');
  }

  get description(){
    return this.addEventForm.get('description');
  }

  get startDate(){
    return this.addEventForm.get('startDate');
  }

  get endDate(){
    return this.addEventForm.get('endDate');
  }

  get color(){
    return this.addEventForm.get('color');
  }

  closeModal() {
    this.activeModalService.close();
  }

  addEvent(){
    const data = this.addEventForm.value;
    this.store.dispatch(new CreateEventAction(data));
    this.activeModalService.close();
  }

  changeColor(color: any){
    this.currentColor = color;
  }

  editEvent(){
    const data = this.addEventForm.value;
    data.id = this.initialEvent.id;
    this.store.dispatch(new UpdateEventAction(data))
    this.activeModalService.close();
  }

  removeEvent(id: any){
    this.store.dispatch(new DeleteEventAction(id));
    this.activeModalService.close();
  }

}
