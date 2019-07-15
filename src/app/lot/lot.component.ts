import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GridApi } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { Lot } from '../model/lot';
import { LotService } from '../services/lot.service';
import { LotItem } from '../model/lotItem';

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
    // this.getVendors();
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  openDialogForAdd(): void {
    const dialogRef = this.dialog.open(LotDetailDialogComponent, {
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
    const dialogRef = this.dialog.open(LotDetailDialogComponent, {
      width: '600px',
      data: { newLot: selectedRowNodes, lotService: this.lotService }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getLots();
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
  searchTerm: FormControl = new FormControl();
  searchedVendors = [] as any;
  lotsItems: LotItem[];

  public columnDefs = [
    { headerName: 'School', field: 'Uniform.School.schoolName', editable: true },
    { headerName: 'Uniform Size', field: 'Uniform.UniformSize', editable: true },
    { headerName: 'Cost Price', field: 'costPrice', editable: true },
    { headerName: 'GST', field: 'gst', editable: true },
    { headerName: 'Quantity', field: 'quantity', editable: true }
  ];

  public gridApi: GridApi;

  constructor(
    public dialogRef: MatDialogRef<LotDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public matData: any
  ) {
    this.newLot = matData.newLot;
    this.lotService = matData.lotService;
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '' && term.length >= 3) {
          this.lotService.getVendors(term).subscribe(data => {
            this.searchedVendors = data as any[];
          });
        }
      }
    );
    this.getLotItems();
  }

  getLotItems() {
    if (this.newLot !== undefined && this.newLot.lotItems !== undefined) {
      this.lotsItems = this.newLot.lotItems;
    } else {
      this.lotsItems = LotItem[0];
    }
  }

  onSaveClick(): void {
    this.lotService.save(this.newLot);
    this.dialogRef.close();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    if (this.newLot === undefined) {
      this.gridApi.showNoRowsOverlay();
    }
  }
}
