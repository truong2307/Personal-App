import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from 'src/services/events.service';

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

  constructor(
     private activeModalService: NgbActiveModal,
     private eventServices: EventsService) { }

  ngOnInit(): void {
    var currDate = (new Date())
    this.reBuildTime = new Date(this.initialDate);
    this.reBuildTime.setHours(currDate.getHours());
    this.reBuildTime.setMinutes(currDate.getMinutes());
    this.reBuildTime.setSeconds(currDate.getSeconds());
    this.initialForm();

    this.colorInit = ['#fa9891','#face91','#c4fa91', '#aee8f2'];
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
    // this.eventServices.addEvent(data).subscribe(
    //   (result) => {
    //     console.log(result);
    //   },
    //   (error) => {
    //     console.log(error);

    //   }
    // )
  }

  changeColor(color: any){
    this.currentColor = color;
  }

}
