import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VendorServiceService } from '../services/vendor-service.service';
import { Vendor } from '../model/vendor';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  @Input() vendor: Vendor;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorServiceService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getVendor();
  }

  getVendor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vendorService.getVendor(id).subscribe(vendor => this.vendor = vendor);
  }

  goBack(): void {
    this.location.back();
  }

}
