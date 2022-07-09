import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from 'src/services/master-data.service';
import { ResponseDatas } from 'src/shared/model/ResponseData.interface';
import { Role } from 'src/shared/model/Role.interface';
import { UserForAdminManagerDto } from 'src/shared/model/User.interface';
import { GetUsersAction, UpdateUsersAction } from 'src/stores/manage-user/manage-user.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  roles: Role[] = [];
  userInfo!: UserForAdminManagerDto;
  updateUserForm!: FormGroup;

  constructor(
    private activeModalService: NgbActiveModal,
    private services : MasterDataService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private store: Store,
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
    this.activeModalService.close();
  }

  updateUser(){
    const data = this.updateUserForm.value
    this.store.dispatch(new UpdateUsersAction(data))

    setTimeout(() => this.activeModalService.close(), 80);
  }
}
