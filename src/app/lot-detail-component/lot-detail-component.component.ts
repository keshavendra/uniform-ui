import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GridApi } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { Lot } from '../model/lot';
import { LotService } from '../services/lot.service';
import { LotItem } from '../model/lotItem';

@Component({
  selector: 'app-lot-detail-component',
  templateUrl: './lot-detail-component.component.html',
  styleUrls: ['./lot-detail-component.component.css']
})
export class LotDetailComponentComponent {
  public newLot: Lot;
  public lotService: LotService;
  searchTerm: FormControl = new FormControl();
  searchedVendors = [] as any;
  lotsItems: LotItem[];

  public columnDefs = [
    { headerName: 'School', field: 'uniform.school.schoolName', editable: true },
    { headerName: 'Uniform Size', field: 'uniform.UniformSize', editable: true },
    { headerName: 'Cost Price', field: 'costPrice', editable: true },
    { headerName: 'GST', field: 'gst', editable: true },
    { headerName: 'Quantity', field: 'quantity', editable: true }
  ];

  public gridApi: GridApi;

  constructor(
    public dialogRef: MatDialogRef<LotDetailComponentComponent>,
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
      this.lotsItems = LotItem[1];
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

  openDialogForAdd() {
    console.log('Button is clicked');
  }
}
