import { ComponentFixture, TestBed } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersComponent } from './users.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { ApiServices } from '@fuse/services/api/api.services';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { ToasterService } from '@fuse/components/toaster/toaster/toaster.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  let mockDialogServices;
  let mockConfirmDialogServices;
  let mockToasterServices;
  let mockUserData =
  {
    "data": [
      {
        "_id": "62e8fdba239a46844e0b9763",
        "firstName": "Abhiyash",
        "lastName": "Rajput",
        "address": "Chandigarh",
        "role": "centreAdmin",
        "email": "abhiyash@gmail.com",
        "agreements": true,
        "created": "2022-08-02T10:34:34.974Z",
        "__v": 0
      },
      {
        "_id": "62e9fd7957b5748a97c49527",
        "firstName": "karan",
        "lastName": "kumar",
        "address": "punjab",
        "role": "developer",
        "email": "karan@gmail.com",
        "agreements": true,
        "created": "2022-08-03T04:45:45.288Z",
        "__v": 0
      }],
    "success": true,
    "message": "User(s) retrieved successfully",
  }
  let mockServices;

  beforeEach(async () => {
    mockServices = jasmine.createSpyObj('service', ['get','delete']);
    mockDialogServices = jasmine.createSpyObj(['dialog', ['open']]);
    mockConfirmDialogServices = jasmine.createSpyObj(['confirmDialog', 'open']);
    mockToasterServices = jasmine.createSpyObj(['toaster', 'show']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UsersComponent],
      providers: [
        { provide: ApiServices, useValue: mockServices },
        { provide: MatDialog, useValue: mockDialogServices },
        { provide: FuseConfirmationService, useValue: mockConfirmDialogServices },
        { provide: ToasterService, useValue: mockToasterServices },
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

      mockServices.get.and.returnValue(of(mockUserData));
      mockServices.delete.and.returnValue(of(true));

      
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;      
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch UserDetails ', () => {
    component.fetchUserDetails();
    expect(component.data).toEqual(mockUserData.data)

  });
  it('should  tableAction() for edit', () => {

    mockDialogServices.open.and.returnValue({afterClosed: () => of(true)});
    
    component.tableAction({ actionName: "edit", row: mockUserData.data[0] });  
    expect( mockServices.get).toHaveBeenCalled()

  });
  it('should  tableAction() for Add', () => {
    mockDialogServices.open.and.returnValue({afterClosed: () => of(true)});    
    component.tableAction({ actionName: "add", row: mockUserData.data[0] });  
    expect( mockServices.get).toHaveBeenCalled();
  });
  
  it('should  tableAction() for Delete', () => {
    mockConfirmDialogServices.open.and.returnValue({afterClosed: () => of('confirmed')});    
    component.tableAction({ actionName: "delete", row: mockUserData.data[0] });  
    expect( mockServices.delete).toHaveBeenCalled();
  });
  it('should delete  onDeleteDetails() call', () => {
    mockConfirmDialogServices.open.and.returnValue({afterClosed: () => of('confirmed')});    
   component.onDeleteDetails(mockUserData.data[0]);
    expect( mockServices.delete).toHaveBeenCalled();
  });
  it('should delete  onDeleteDetails() call', () => {
    mockConfirmDialogServices.open.and.returnValue({afterClosed: () => of('cancelled')});    
   component.onDeleteDetails(mockUserData.data[0]) 
    expect( mockServices.delete).not.toHaveBeenCalled();
  });
});