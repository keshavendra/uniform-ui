import { Component, OnInit, Input } from '@angular/core';
import { Vendor } from '../model/vendor';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  @Input() vendor: Vendor;

  constructor() { }

  ngOnInit() {
  }

}
