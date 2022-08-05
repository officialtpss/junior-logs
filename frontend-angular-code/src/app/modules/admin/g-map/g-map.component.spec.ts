import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@fuse/components/toaster/toaster/toaster.service';
import { AuthService } from 'app/core/auth/auth.service';
import { of, throwError } from 'rxjs';

import { GMapComponent } from './g-map.component';

describe('GMapComponent', () => {
  let component: GMapComponent;
  let fixture: ComponentFixture<GMapComponent>;
  let mockDialogServices;
  let mock__toaster;
  let mock_authService;
  let mockLocationData = {
    "data": [
      { "location": { "type": "Point", "coordinates": [76.21527548828125, 30.909356463892102] }, "_id": "62e9f08f57b5748a97c494d0", "userId": "62e8fd1b239a46844e0b9758", "title": "punjab", "draggable": false, "created": "2022-08-03T03:50:39.210Z", "__v": 0 },
      { "location": { "type": "Point", "coordinates": [76.23724814453125, 30.94234199004179] }, "_id": "62e9f09e57b5748a97c494d2", "userId": "62e8fd1b239a46844e0b9758", "title": "delhi", "draggable": false, "created": "2022-08-03T03:50:54.361Z", "__v": 0 },
      { "location": { "type": "Point", "coordinates": [78.00875063934326, 31.217955648324317] }, "_id": "62e9f95657b5748a97c49504", "userId": "62e8fd1b239a46844e0b9758", "title": "shrinagar", "draggable": false, "created": "2022-08-03T04:28:06.133Z", "__v": 0 },
    ]
  }
  beforeEach(async () => {
    mockDialogServices = jasmine.createSpyObj(['dialog', ['open']]);
    mock_authService = jasmine.createSpyObj(['_authService', ['get']]);
    mock__toaster = jasmine.createSpyObj(['_toaster', 'show']);


    await TestBed.configureTestingModule({
      declarations: [GMapComponent],
      providers: [
        { provide: AuthService, useValue: mock_authService },
        { provide: MatDialog, useValue: mockDialogServices },
        { provide: ToasterService, useValue: mock__toaster },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }
    )
      .compileComponents();

    mock_authService.get.and.returnValue(of(mockLocationData));

    fixture = TestBed.createComponent(GMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Get Location', () => {
    fixture.detectChanges();
    expect(mock_authService.get).toHaveBeenCalled();

  });
  
  it('should Update markers After Get Location', () => {
    fixture.detectChanges();
    expect(component.markers.length).toBe(mockLocationData.data.length);

  });
  it('should clickedMarker call on demand', () => {
    spyOn(component, 'clickedMarker');
    component.clickedMarker('test', 1)
    expect(component.clickedMarker).toHaveBeenCalled()

  });
  it('should markerDragEnd call on demand', () => {
    spyOn(component, 'markerDragEnd');
    component.markerDragEnd({
      lat: 30.7046,
      lng: 76.7179,
      title: 'dsfsdf',
      draggable: true
    }, 'test')
    expect(component.markerDragEnd).toHaveBeenCalled()

  });
  it('should Update markers After Get Location', () => {
    let Mockevent = { coords: { lat: 30.7282125314898, lng: 75.39679404296875 } };
    let defaultLength = component.markers.length;
    let MockResultData = {
      draggable: false,
      lat: 30.7282125314898,
      lng: 75.39679404296875,
      title: "ssadd"
    };
    mockDialogServices.open.and.returnValue({ afterClosed: () => of(MockResultData) });
    component.mapClicked(Mockevent);
    expect(component.markers.length).toBeGreaterThan(defaultLength);

  });


});
