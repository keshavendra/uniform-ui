import { Component, OnInit, Inject } from '@angular/core';
import { UniformSize } from '../model/uniformSize';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GridApi } from 'ag-grid-community';
import { UniformSizeService } from '../services/uniform-size.service';

@Component({
  selector: 'app-uniform-size',
  templateUrl: './uniform-size.component.html',
  styleUrls: ['./uniform-size.component.css']
})
export class UniformSizeComponent implements OnInit {

  public columnDefs = [
    {headerName: 'UniformSize Id', field: 'sizeId', sortable: true},
    {headerName: 'Gender', field: 'gender'},
    {headerName: 'Uniform Number', field: 'uniformNumber'},
  ];

  public newUniformSize: UniformSize = {
    gender: '',
    uniformNumber: 0
  };

  public uniformSizes: UniformSize[];
  public gridApi: GridApi;
  selectedUniformSize: UniformSize;
  private rowSelection;

  constructor(
    private uniformSizeService: UniformSizeService,
    public dialog: MatDialog
  ) { this.rowSelection = 'single';
 }

  ngOnInit() {
    this.getUniformSizes();
  }

  getUniformSizes(): void {
    this.uniformSizeService.getUniformSizes().subscribe(
      resultUniformSizes => {this.uniformSizes = resultUniformSizes; }, error => {console.log(error); });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  openDialogForAdd(): void {
    const dialogRef = this.dialog.open(UniformSizeDetailComponentDialog, {
      width: '600px',
      data: {newUniformSize: this.newUniformSize, uniformSizeService: this.uniformSizeService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getUniformSizes();
      // this.animal = result;
    });
  }

  openDialogForUpdate(): void {
    const selectedRowNodes = this.gridApi.getSelectedRows()[0];
    const dialogRef = this.dialog.open(UniformSizeDetailComponentDialog, {
      width: '600px',
      data: {newUniformSize: selectedRowNodes, uniformSizeService: this.uniformSizeService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getUniformSizes();
      // this.animal = result;
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'uniform-size-detail-component',
  templateUrl: 'uniform-size.detail.component.html',
})

// tslint:disable-next-line:component-class-suffix
export class UniformSizeDetailComponentDialog {
  public newUniformSize: UniformSize;
  public uniformSizeService: UniformSizeService;
  constructor(
    public dialogRef: MatDialogRef<UniformSizeDetailComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public matData: any
    ) {
      this.newUniformSize = matData.newUniformSize;
      this.uniformSizeService = matData.uniformSizeService;
    }

  onSaveClick(): void {
    this.uniformSizeService.save(this.newUniformSize);
    this.dialogRef.close();
  }
}
