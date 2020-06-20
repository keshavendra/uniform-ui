import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { School } from '../model/school';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GridApi } from 'ag-grid-community';
import { SchoolsService } from '../services/schools.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  public columnDefs = [
    {headerName: 'SchoolId', field: 'schoolId', sortable: true},
    {headerName: 'SchoolName', field: 'schoolName'}
  ];

  public newSchool: School = {
    schoolName: ''
  };

  public schools: School[];
  public gridApi: GridApi;
  selectedSchool: School;
  private rowSelection;
  private isButtonVisible = false;
  readonly columnWidth: string = '600px';

  constructor(
    private schoolService: SchoolsService,
    public dialog: MatDialog
  ) { this.rowSelection = 'single';
  }

  ngOnInit() {
    this.getSchools();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.isButtonVisible = selectedRows.length === 0 ? false : true;
    this.selectedSchool = selectedRows.length === 0 ? null : selectedRows[0];
  }

  getSchools(): void {
    this.schoolService.getSchools().subscribe(resultSchools => {this.schools = resultSchools; }, error => {console.log(error); });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.redrawRows();
  }

  openDialogForAdd(): void {
    const dialogRef = this.dialog.open(SchoolDetailComponentDialog, {
      width: this.columnWidth,
      data: {isNewData: true, newSchool: this.newSchool, schoolService: this.schoolService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.gridApi.deselectAll();
      this.getSchools();
    });
  }

  openDialogForUpdate(): void {
    const selectedRowNodes = this.gridApi.getSelectedRows()[0];
    const dialogRef = this.dialog.open(
      SchoolDetailComponentDialog, {
      width: this.columnWidth,
      data: { isNewData: false, newSchool: selectedRowNodes, schoolService: this.schoolService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.gridApi.deselectAll();
      this.getSchools();
      // this.animal = result;
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'school-detail-component',
  templateUrl: 'school.detail.component.html',
})

// tslint:disable-next-line:component-class-suffix
export class SchoolDetailComponentDialog {
  public newSchool: School;
  public schoolService: SchoolsService;
  private isNew: boolean;
  constructor(
    public dialogRef: MatDialogRef<SchoolDetailComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public matData: any
    ) {
      this.newSchool = matData.newSchool;
      this.schoolService = matData.schoolService;
      this.isNew = matData.isNewData;
    }

    ngOnInit() {
      this.dialogRef.keydownEvents().subscribe(event => {
        if (event.key === 'Escape') {
            this.onCancel();
        }
    });

      this.dialogRef.backdropClick().subscribe(event => {
        this.onCancel();
    });
    }

  onSaveClick(): void {
    if (this.isNew) {
      this.schoolService.save(this.newSchool);
    } else {
      this.schoolService.update(this.newSchool);
    }
    this.dialogRef.close();
  }

  onCancel(): void {
    console.log('Cancel clicked');
    this.dialogRef.close();
  }
}
