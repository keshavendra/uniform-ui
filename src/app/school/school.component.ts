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

  constructor(
    private schoolService: SchoolsService,
    public dialog: MatDialog
  ) { this.rowSelection = 'single';
  }

  ngOnInit() {
    this.getSchools();
  }

  onSelect(school: School): void {
    this.selectedSchool = school;
  }

  getSchools(): void {
    this.schoolService.getSchools().subscribe(resultSchools => {this.schools = resultSchools; }, error => {console.log(error); });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  openDialogForAdd(): void {
    const dialogRef = this.dialog.open(SchoolDetailComponentDialog, {
      width: '600px',
      data: {newSchool: this.newSchool, schoolService: this.schoolService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getSchools();
      // this.animal = result;
    });
  }

  openDialogForUpdate(): void {
    const selectedRowNodes = this.gridApi.getSelectedRows()[0];
    const dialogRef = this.dialog.open(SchoolDetailComponentDialog, {
      width: '600px',
      data: {newSchool: selectedRowNodes, schoolService: this.schoolService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
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
  constructor(
    public dialogRef: MatDialogRef<SchoolDetailComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public matData: any
    ) {
      this.newSchool = matData.newSchool;
      this.schoolService = matData.schoolService;
    }

  onSaveClick(): void {
    this.schoolService.save(this.newSchool);
    this.dialogRef.close();
  }
}
