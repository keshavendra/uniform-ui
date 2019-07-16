import { Injectable } from '@angular/core';
import { UniformSize } from '../model/uniformSize';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})
export class UniformSizeService {
  constructor(private http: HttpClient) { }

  private uniformSizeURL = 'http://localhost:8080/uniform/uniformsize';

  private myHeader = new Headers();

  getUniformSizes(): Observable<UniformSize[]> {
    return this.http.get<UniformSize[]>(this.uniformSizeURL + '/list', httpOptions);
  }

  save(uniformSizeObject: UniformSize) {
    this.http.post(this.uniformSizeURL + '/save', uniformSizeObject, httpOptionsPost).subscribe();
  }

}
