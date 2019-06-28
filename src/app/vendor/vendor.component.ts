import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Vendor } from '../model/vendor';
// import { VENDORS_LIST } from '../mock/mock-vendors';
import { VendorServiceService } from '../services/vendor-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  public columnDefs = [
    {headerName: 'VendorId', field: 'vendorId', sortable: true},
    {headerName: 'VendorName', field: 'vendorName'},
    {headerName: 'VendorAddress', field: 'vendorAddress', editable: true},
    {headerName: 'VendorPhoneNumber', field: 'vendorPhoneNumber', editable: true}
  ];

  public newVendor: Vendor = {
    vendorName: '',
    vendorAddress: '',
    vendorPhoneNumber: ''
  };

  public vendors: Vendor[];
  public gridApi: GridApi;
  selectedVendor: Vendor;

  constructor(
    private vendorService: VendorServiceService,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.getVendors();
  }

  onSelect(vendor: Vendor): void {
    this.selectedVendor = vendor;
  }

  getVendors(): void {
    this.vendorService.getVendors().subscribe(resultVendors => {this.vendors = resultVendors; }, error => {console.log(error); });
  }

  onGridReady(params) {
    // this.getVendors();
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {newVendor: this.newVendor, vendorService: this.vendorService}
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vendor-detail-component',
  templateUrl: 'vendor.detail.component.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {
  public newVendor: Vendor;
  public vendorService: VendorServiceService;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public matData: any
    ) {
      this.newVendor = matData.newVendor;
      this.vendorService = matData.vendorService;
    }

  onSaveClick(): void {
    this.vendorService.save(this.newVendor);
    this.dialogRef.close();
  }
}
