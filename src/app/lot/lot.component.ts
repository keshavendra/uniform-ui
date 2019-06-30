import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GridApi } from 'ag-grid-community';
import { Lot } from '../model/lot';
import { LotService } from '../services/lot.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit {

  public newLot: Lot;

  public columnDefs = [
    {headerName: 'Vendor Name', field: 'lotVendor.vendorName'},
    {headerName: 'Extras', field: 'extras'},
    {headerName: 'Created Date', field: 'lotCreatedDate'},
    {headerName: 'Last Modified Date', field: 'lotModifiedDate'}
  ];

  public lots: Lot[];
  public gridApi: GridApi;
  selectedLot: Lot;
  private rowSelection;

  constructor(
    private lotService: LotService,
    public dialog: MatDialog
  ) {this.rowSelection = 'single'; }

  ngOnInit() {
  }

  onSelect(lot: Lot): void {
    this.selectedLot = lot;
  }

  getLots(): void {
    this.lotService.getLots().subscribe(resultLots => {this.lots = resultLots; }, error => {console.log(error); });
  }

  onGridReady(params) {
    // this.getVendors();
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  openDialogForAdd(): void {
    const dialogRef = this.dialog.open(LotDetailDialogComponent, {
      width: '600px',
      data: {newLot: this.newLot, lotService: this.lotService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getLots();
      // this.animal = result;
    });
  }

  openDialogForUpdate(): void {
    const selectedRowNodes = this.gridApi.getSelectedRows()[0];
    const dialogRef = this.dialog.open(LotDetailDialogComponent, {
      width: '600px',
      data: {newLot: this.newLot, lotService: this.lotService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getLots();
      // this.animal = result;
    });
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lot-detail-component',
  templateUrl: 'lot.detail.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class LotDetailDialogComponent {
  public newLot: Lot;
  public lotService: LotService;
  constructor(
    public dialogRef: MatDialogRef<LotDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public matData: any
    ) {
      this.newLot = matData.newLot;
      this.lotService = matData.lotService;
    }

  onSaveClick(): void {
    this.lotService.save(this.newLot);
    this.dialogRef.close();
  }
}
