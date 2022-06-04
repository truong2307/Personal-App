import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from 'src/services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  addEventForm!: FormGroup;
  initialDate: string = '';

  constructor(
     private activeModalService: NgbActiveModal,
     private eventServices: EventsService) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm (){
    this.addEventForm = new FormGroup({
      title : new FormControl('', [Validators.required,]),
      description : new FormControl('', [Validators.required,]),
      startDate : new FormControl(new Date(this.initialDate), [Validators.required,]),
      endDate : new FormControl(new Date(this.initialDate), [Validators.required,]),
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

}
