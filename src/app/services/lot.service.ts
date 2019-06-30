import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Lot } from '../model/lot';
import { Observable, of } from 'rxjs';

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
export class LotService {

  constructor(private http: HttpClient) { }

  private lotURL = 'http://localhost:8080/uniform/lot';

  private myHeader = new Headers();

  getLots(): Observable<Lot[]> {
    return this.http.get<Lot[]>(this.lotURL + '/list', httpOptions);
  }

  getLot(id: number): Observable<Lot> {
    const parameters = new HttpParams().set('lotId', id.toString());
    return this.http.get<Lot>(this.lotURL + '/getLotById', {params: parameters});
  }

  save(lotObject: Lot) {
    this.http.post(this.lotURL + '/save', lotObject, httpOptionsPost).subscribe();
  }
}
