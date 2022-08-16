import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    private activeModalService: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModalService.dismiss();
  }

  deleteItem(){
    this.activeModalService.close();
  }

}
