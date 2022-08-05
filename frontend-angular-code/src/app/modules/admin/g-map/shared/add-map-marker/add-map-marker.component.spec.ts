import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { SharedModule } from 'app/shared/shared.module';
import { of } from 'rxjs';

import { AddMapMarkerComponent } from './add-map-marker.component';

describe('AddMapMarkerComponent', () => {
  let component: AddMapMarkerComponent;
  let fixture: ComponentFixture<AddMapMarkerComponent>;
  let authService = jasmine.createSpyObj('_authService', ['post']),
  mockDialogServices = jasmine.createSpyObj('dialog', ['close']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMapMarkerComponent ],
      imports:[
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: MatDialog, useValue: mockDialogServices },
        { provide: MAT_DIALOG_DATA, useValue: {lat: 55, lng: 77 } },
        { provide: MatDialogRef, useValue: { close: () => { } } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMapMarkerComponent);
    component = fixture.componentInstance;
    authService.post.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
