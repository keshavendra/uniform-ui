import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor';
import { VENDORS_LIST } from '../mock/mock-vendors';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const httpOptionsPost = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }
  ),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})

export class VendorServiceService {

  constructor(private http: HttpClient) { }

  private vendorURL = 'http://localhost:8080/uniform/vendor';

  private myHeader = new Headers();

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.vendorURL + '/list', httpOptions);
  }

  getVendor(id: number): Observable<Vendor> {
    return of(VENDORS_LIST.find(vendor => vendor.vendorId === id ));
  }

  save(vendorObject: Vendor) {
    this.http.post(this.vendorURL + '/save', vendorObject, httpOptionsPost).subscribe();
  }

}
