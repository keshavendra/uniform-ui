import { Component, OnInit } from '@angular/core';
import { Vendor } from '../model/vendor';
import { VENDORS_LIST } from '../mock/mock-vendors';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendors = VENDORS_LIST;

  selectedVendor: Vendor;

  constructor() { }

  ngOnInit() {
  }

  onSelect(vendor: Vendor): void {
    this.selectedVendor = vendor;
  }

}
