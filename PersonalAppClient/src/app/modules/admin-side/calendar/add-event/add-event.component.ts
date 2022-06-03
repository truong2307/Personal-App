import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  addEventForm!: FormGroup;

  constructor(
     private activeModalService: NgbActiveModal) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm (){
    this.addEventForm = new FormGroup({
      summary : new FormControl('', [Validators.required,]),
      description : new FormControl('', [Validators.required,]),
      startDate : new FormControl('', [Validators.required,]),
      endDate : new FormControl('', [Validators.required,]),
    })
  }

  get summary(){
    return this.addEventForm.get('summary');
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

}
