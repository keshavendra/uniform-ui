import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GridApi } from 'ag-grid-community';
import { Lot } from '../model/lot';
import { LotService } from '../services/lot.service';
import { LotDetailComponentComponent } from '../lot-detail-component/lot-detail-component.component';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit {

  public newLot: Lot;

  public columnDefs = [
    { headerName: 'Vendor Name', field: 'lotVendor.vendorName' },
    { headerName: 'Extras', field: 'extras' },
    { headerName: 'Created Date', field: 'lotCreatedDate' },
    { headerName: 'Last Modified Date', field: 'lotModifiedDate' }
  ];

  public lots: Lot[];
  public gridApi: GridApi;
  selectedLot: Lot;
  private rowSelection;

  constructor(
    private lotService: LotService,
    public dialog: MatDialog
  ) { this.rowSelection = 'single'; }

  ngOnInit() {
    this.getLots();
  }

  onSelect(lot: Lot): void {
    this.selectedLot = lot;
  }

  getLots(): void {
    this.lotService.getLots().subscribe(resultLots => { this.lots = resultLots; }, error => { console.log(error); });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  openDialogForAdd(): void {
    const dialogRef = this.dialog.open(LotDetailComponentComponent, {
      width: '600px',
      data: { newLot: this.newLot, lotService: this.lotService }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getLots();
    });
  }

  openDialogForUpdate(): void {
    const selectedRowNodes = this.gridApi.getSelectedRows()[0] as Lot;
    const dialogRef = this.dialog.open(LotDetailComponentComponent, {
      width: '600px',
      data: { newLot: selectedRowNodes, lotService: this.lotService }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getLots();
    });
  }

}

