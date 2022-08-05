import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { ToasterService } from '@fuse/components/toaster/toaster/toaster.service';
import AppConstants from 'app/app.constants';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { CryptoSecurityService } from 'app/services/crypto-security.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddEditUserComponent implements OnInit {
  title: string;
  userDetail: User;
  user: FormGroup
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  USER_ROLES = AppConstants.USER_ROLES;
  constructor(
    private _service: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AddEditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _crypto: CryptoSecurityService,
    private _toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.checkAction(this.data);
  }

  /**
   * checkAction : Purpose to check to open dialog box for Add or for Edit
   * @param param0 
   */
  checkAction({ actionName, data }) {
    switch (actionName) {
      case 'add':
        this.createForm();
        break;
      case 'edit':
        this.userDetail = data;
        this.createForm();
        break;
      default:
        break;
    }
    this.title = this.userDetail ? AppConstants.EDIT_USER : AppConstants.ADD_USER ;
  }
  /**
   * createForm:Purpose to build reactive form
   */
  createForm(): void {
    this.user = this.formBuilder.group({
      firstName: [this.userDetail?.firstName ? this.userDetail.firstName : '', [Validators.required]],
      lastName: [this.userDetail?.lastName ? this.userDetail.lastName : '', [Validators.required]],
      email: [this.userDetail?.email ? this.userDetail.email : '', [Validators.required, Validators.email]],
      password: [this.userDetail?.password ? this.userDetail.password : '', [Validators.required]],
      role: [this.userDetail?.role ? this.userDetail.role : '', [Validators.required]],
      address: [this.userDetail?.address ? this.userDetail.address : ''],
    });
    if(this.userDetail){
      this.user.get('password').disable();
      this.user.get('email').disable();
    }
  }

  /**
   * onCreateUser: Purpose to create todo
   */

  onCreateUser(value: User): void {
    if (value?.password) {
      value.password = this._crypto.encrypt(value.password);
    }
    this._service.create(value).subscribe({
      next: (res) => {
        this.dialog.close(true)
        this._toaster.show('success', AppConstants.SUCCESS, AppConstants.USER_ADDED_SUCCESS);
      }, error: ({ error }) => {
        this.alert = {
          type: 'error',
          message: error?.message
        };
        this.showAlert = true;
        return;
      }
    })
  }

  /**
   * onEditDetails: Purpose to edit the table 
   */
  onEditDetails(row: User) {
    delete row.email;
    delete row.password;
    this._service.updateUser(row, this.userDetail._id).subscribe({
      next: (res) => {
        this.dialog.close(true);
        this._toaster.show('success', AppConstants.SUCCESS, AppConstants.USER_EDITED_SUCCESS);
      }, error: ({ error }) => {
        this.alert = {
          type: 'error',
          message: error?.message
        };
        this.showAlert = true;
      }
    })
  }

  /**
   * submit: Purpose to use submit the form 
   * @param row 
   */
  submit() {
    this.showAlert = false;
    if (this.user.invalid) return false;
    switch (this.data?.actionName) {
      case 'add':
        this.onCreateUser(this.user.value);
        break;
      case 'edit':
        this.onEditDetails(this.user.value);
        break;
      default:
        break;
    }
  }

}
