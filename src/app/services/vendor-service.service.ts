import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

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
    const parameters = new HttpParams().set('vendorId', id.toString());
    return this.http.get<Vendor>(this.vendorURL + '/getVendorById', {params: parameters});
  }

  save(vendorObject: Vendor) {
    this.http.post(this.vendorURL + '/save', vendorObject, httpOptionsPost).subscribe();
  }

  getVendorsByTerm(term: string) {
    const listOfVendors = this.http.get<Vendor[]>(this.vendorURL + '/list/' + term, httpOptions)
    .pipe(debounceTime(500),
    map((data: any) => {
      return (
        data.length !== 0 ? data as any[] : [{'Vendor Name': 'No record found'} as any]
      );
    }));
    return listOfVendors;
  }

}
