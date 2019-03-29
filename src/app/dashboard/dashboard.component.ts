import { Component, OnInit } from '@angular/core';
import { Vendor } from '../model/vendor';
import { VendorServiceService } from '../services/vendor-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(private vendorService: VendorServiceService) { }

  ngOnInit() {
    this.getVendors();
  }

  getVendors(): void {
    this.vendorService.getVendors()
      .subscribe(vendors => this.vendors = vendors.slice(0, 2));
  }
}
