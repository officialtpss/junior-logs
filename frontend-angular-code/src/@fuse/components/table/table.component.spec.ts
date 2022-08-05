import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { userAction } from './table.types';
let columns: Array<any> = [
  {
    columnDef: 'firstName',
    header: 'First Name',
    sort: true,
    isDisplayed: true,
  },
  {
    columnDef: 'lastName',
    header: 'Last Name',
    sort: true,
    isDisplayed: true,
  },
  {
    columnDef: 'email',
    header: 'Email',
    sort: true,
    isDisplayed: true,
  },
  {
    columnDef: 'address',
    header: 'City',
    sort: true,
    isDisplayed: true,
  },
  {
    columnDef: 'fullRole',
    header: 'Role',
    sort: false,
    isDisplayed: true,
  }
];
let userActions: Array<userAction | any> = [
  {
    type: 'edit',
    hide: false
  },
  {
    type: 'delete',
    hide: false,
    hidePredicate: (row) => { }

  }

]
let tableMockData = [{
  address: "Chandigarh",
  agreements: true,
  created: "2022-08-02T10:34:34.974Z",
  email: "abhiyash@gmail.com",
  firstName: "Abhiyash",
  fullRole: "Center Admin",
  lastName: "Rajput",
  role: "centreAdmin",
  __v: 0,
  _id: "62e8fdba239a46844e0b9763",
}, {
  address: "ChanSdigarh",
  agreements: true,
  created: "2022-08-02T10:34:34.974Z",
  email: "abhiyash@gmail.com",
  firstName: "Abhiyash",
  fullRole: "Center Admin",
  lastName: "Rajput",
  role: "centreAdmin",
  __v: 0,
  _id: "62e8fdb3433a239a46844e0b9763",
}]
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update columns on ngOnChanges', () => {
    component.columns = columns;
    component.ngOnChanges(
      {
        columns: new SimpleChange(null, component.columns, null),
      },
    );
    fixture.detectChanges();
    expect(component.displayedColumns.length).toBeGreaterThan(0)
  });
  it('should update tableMockData on ngOnChanges', () => {
    component.tableData = tableMockData;
    component.ngOnChanges(
      {
        tableData: new SimpleChange(null, component.tableData, null)
      },
    );
    expect(component.dataSource.data.length).toBeGreaterThanOrEqual(tableMockData.length)
  });

  it('should update filterValue on ngOnChanges', () => {
    component.filterValue = 'sdas';
    component.ngOnChanges(
      {
        filterValue: new SimpleChange(component.filterValue, component.filterValue, null)
      }
    );
    fixture.detectChanges();

    expect(component.filterValue).toBe('sdas')
  });



  it('should update userActions on ngOnChanges', () => {
    component.userActions = userActions;
    component.ngOnChanges(
      {

        userActions: new SimpleChange(null, component.userActions, null),
      },
    );
    fixture.detectChanges();
    expect(component.userActions).toEqual(userActions)
  });
  it('should sort DATA', () => {
    component.tableData = tableMockData;
    component.ngOnChanges(
      {
        tableData: new SimpleChange(null, component.tableData, null)
      },
    );
    component.sortData({ active: "firstName", direction: "desc" })
    expect(component.dataSource.data.length).toBeGreaterThan(0)
  });

  it('should compare function return 1', () => {
    expect(component.compare('karan', 'Abhiyash', true)).toBe(1)
  });
  it('should onActionClick emit value in action', () => {
    component.action.subscribe(res => {
      expect(res.row).toEqual(tableMockData[0])

    });
    component.onActionClick({ actionName: 'edit', row: tableMockData[0] })
    // expect(component.onActionClick({actionName:'',row:tableMockData[0]})).toBe(1)
  })

});
