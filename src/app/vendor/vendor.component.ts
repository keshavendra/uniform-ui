import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendor } from '../model/vendor';
// import { VENDORS_LIST } from '../mock/mock-vendors';
import { VendorServiceService } from '../services/vendor-service.service';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { AgGridColumn } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendors: Vendor[];
  private gridApi: any;
  selectedVendor: Vendor;

  columnDefs = [
    {headerName: 'VendorId', field: 'vendorId'},
    {headerName: 'VendorName', field: 'vendorName'},
    {headerName: 'VendorAddress', field: 'vendorAddress', editable: true},
    {headerName: 'VendorPhoneNumber', field: 'vendorPhoneNumber', editable: true}
  ];


  constructor(
    private vendorService: VendorServiceService
  ) {  }

  ngOnInit() {
    this.getVendors();
  }

  onSelect(vendor: Vendor): void {
    this.selectedVendor = vendor;
  }

  getVendors(): void {
    this.vendorService.getVendors().subscribe(vendors => this.vendors = vendors);
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
}
