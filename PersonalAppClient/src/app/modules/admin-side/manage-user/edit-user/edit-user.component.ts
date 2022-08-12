import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from 'src/services/master-data.service';
import { ResponseDatas } from 'src/shared/model/response-data.interface';
import { Role } from 'src/shared/model/role.interface';
import { UserForAdminManagerDto } from 'src/shared/model/user.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  roles: Role[] = [];
  userInfo!: UserForAdminManagerDto;
  updateUserForm!: FormGroup;
  @Output() dataUser = new EventEmitter();

  constructor(
    private activeModalService: NgbActiveModal,
    private services : MasterDataService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.services.getEvents().subscribe((response : ResponseDatas) =>{
      this.roles = response.datas;
    },
    (error) => {
      this.toastr.error(
        this.translate.instant('common.Error')
      )
    })
    this.initialForm();
  }

  initialForm (){
    this.updateUserForm = new FormGroup({
      role : new FormControl(this.userInfo.role, [Validators.required]),
      userId : new FormControl(this.userInfo.userId, [Validators.required]),
    })
  }

  get role(){
    return this.updateUserForm.get('role');
  }

  closeModal() {
    this.activeModalService.dismiss();
  }

  updateUser(){
    const data = this.updateUserForm.value
    this.dataUser.emit(data);
    this.activeModalService.close();
  }
}
