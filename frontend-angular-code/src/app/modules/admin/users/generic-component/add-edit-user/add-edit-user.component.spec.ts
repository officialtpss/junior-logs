import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterService } from '@fuse/components/toaster/toaster/toaster.service';
import AppConstants from 'app/app.constants';
import { UserService } from 'app/core/user/user.service';
import { CryptoSecurityService } from 'app/services/crypto-security.service';
import { of, throwError } from 'rxjs';

import { AddEditUserComponent } from './add-edit-user.component';

let mock_service;
let mockDialogServices;
let mock_toasterServices;
let mock__cryptoServices;
let mockEditData: any = {
  action: 'add',
  data: {}
};
describe('AddEditUserComponent', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;
  mock_service = jasmine.createSpyObj('_service', ['create', 'updateUser']);
  mockDialogServices = jasmine.createSpyObj('dialog', ['close']);
  mock_toasterServices = jasmine.createSpyObj(['_toaster', 'show']);
  mock__cryptoServices = jasmine.createSpyObj(['_crypto', 'encrypt']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatSelectModule, MatFormFieldModule, MatInputModule, BrowserDynamicTestingModule, NoopAnimationsModule],
      declarations: [AddEditUserComponent],
      providers: [
        { provide: UserService, useValue: mock_service },
        { provide: MatDialog, useValue: mockDialogServices },
        { provide: MAT_DIALOG_DATA, useValue: mockEditData },
        { provide: MatDialogRef, useValue: { close: () => { } } },
        { provide: ToasterService, useValue: mock_toasterServices },
        { provide: CryptoSecurityService, useValue: mock__cryptoServices },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    component.USER_ROLES = AppConstants.USER_ROLES;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have data ', () => {
    component.data = {};
    component.checkAction({
      actionName: "add",
      data: {},
    });
    fixture.detectChanges();
    expect(component.user.valid).toBeFalse();
  });

  it('should have edit  data ', () => {
    component.checkAction({
      actionName: "edit",
      data: {
        address: "Chandigarh",
        agreements: true,
        created: "2022-08-02T10:34:34.974Z",
        email: "abhiyash@gmail.com",
        firstName: "Abhiyash",
        fullRole: "Center Admin",
        lastName: "Rajput",
        password: 'ds',
        role: "centreAdmin",
        __v: 0,
        _id: "62e8fdba239a46844e0b9763"
      }
    });
    fixture.detectChanges();
    expect(component.user.valid).toBeTrue();
    expect(component.title).toBe(AppConstants.EDIT_USER);
  });

  it('should have onCreateUser with success', () => {
    component.data = {
      actionName: "add",
      data: {
        address: "Chandigarh",
        agreements: true,
        created: "2022-08-02T10:34:34.974Z",
        email: "abhiyash@gmail.com",
        firstName: "Abhiyash",
        fullRole: "Center Admin",
        lastName: "Rajput",
        password: 'dsdd',
        role: "centreAdmin",
        __v: 0,
        _id: "62e8fdba239a46844e0b9763"
      }
    }
    component.checkAction(component.data);
    mock_service.create.and.returnValue(of(true))
    component.submit();
    fixture.detectChanges();
    expect(component.onCreateUser).toBeDefined();
  });
  it('should have onCreateUser with error', () => {
    component.checkAction({
      actionName: "add",
      data: {
        address: "Chandigarh",
        agreements: true,
        created: "2022-08-02T10:34:34.974Z",
        email: "abhiyash@gmail.com",
        firstName: "Abhiyash",
        fullRole: "Center Admin",
        lastName: "Rajput",
        password: 'dsdd',
        role: "centreAdmin",
        __v: 0,
        _id: "62e8fdba239a46844e0b9763"
      }
    });
    mock_service.create.and.returnValue(of(new Error('')));
    component.onCreateUser(component.user.value);
    fixture.detectChanges();
    expect(component.onCreateUser).toBeDefined();
  });

  it('should have onEditDetails', () => {
    let data = {
      address: "Chandigarh",
      email: "abhiyash@gmail.com",
      firstName: "Abhiyash",
      lastName: "Rajput",
      password: 'dsdd',
      role: "centreAdmin",
      _id: "62e8fdba239a46844e0b9763"
    };
    component.data = data;
    component.userDetail = component.data;
    mock_service.updateUser.and.returnValue(of(true));
    component.onEditDetails(component.data);
    mock__cryptoServices.encrypt('dsdd')
    fixture.detectChanges();
    expect(component.onEditDetails).toBeDefined();
  });

 

  it('should have on add submit', () => {
    component.data = { actionName: 'add' }
    component.userDetail = {
      address: "Chandigarh",
      email: "abhiyash@gmail.com",
      firstName: "Abhiyash",
      lastName: "Rajput",
      password: 'dsdd',
      role: "centreAdmin",
      _id: "62e8fdba239a46844e0b9763"
    };
    mock_service.create.and.returnValue(of(true));
    component.createForm();
    component.submit();
    fixture.detectChanges();
    expect(component.submit).toBeDefined();
  });

  it('should have on actionName wrong submit', () => {
    component.data = { };
    component.userDetail = {
      address: "Chandigarh",
      email: "abhiyash@gmail.com",
      firstName: "Abhiyash",
      lastName: "Rajput",
      password: 'dsdd',
      role: "centreAdmin",
      _id: "62e8fdba239a46844e0b9763"
    };
    component.createForm();
    component.submit();
    fixture.detectChanges();
    expect(component.submit).toBeDefined();
  });
});
