import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { column, userAction } from './table.types';

@Component({
  selector: 'fuse-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  @Output() refersh: EventEmitter<Boolean> = new EventEmitter();
  @Output() action: EventEmitter<any> = new EventEmitter();
  @Input() tableData: any[];
  @Input() columns: Array<column> = [];
  @Input() userActions: Array<userAction> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)   sort: MatSort;
  public dataSource: MatTableDataSource<any>;
  @Input() filterValue: string = '';
  constructor(
  ) {

  }
  ngOnInit(): void {
  }

  /**
   * onActionClick: Purpose to perfom action on click on table
   * @param param
   */
  onActionClick({ actionName, row }: { actionName: string, row: any }) {
    this.action.emit({ actionName, row })
  }


  /**
   * ngAfterViewInit: Purpose to use when Angular has completed initializ component's view 
   * this will sort the data
   */
  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns && changes.columns.previousValue !== changes.columns.currentValue) {
      this.displayedColumns = this.columns?.filter((column: column) => column.isDisplayed)
        ?.map((column: column) => column?.columnDef);
    }
    if (changes.tableData && changes.tableData.previousValue !== changes.tableData.currentValue) {
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }
    if (changes.filterValue && changes.filterValue.previousValue !== changes.filterValue.currentValue) {
      this.dataSource.filter = this.filterValue;
    }
    if (changes.userActions && changes.userActions.previousValue !== changes.userActions.currentValue) {
      let index = this.displayedColumns.indexOf('action');
      this.userActions?.length && index < 0 && this.displayedColumns.push('action');
      !this.userActions?.length && index > -1 && this.displayedColumns.splice(index, 1);
    }

  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
     const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    
  }
}


