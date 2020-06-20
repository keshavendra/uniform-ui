import { Injectable } from '@angular/core';
import { School } from '../model/school';
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

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private http: HttpClient) { }

  private schoolURL = 'http://localhost:8080/uniform/school';

  private myHeader = new Headers();

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.schoolURL + '/list', httpOptions);
  }

  getSchool(id: number): Observable<School> {
    const parameters = new HttpParams().set('schoolId', id.toString());
    return this.http.get<School>(this.schoolURL + '/getSchoolById', {params: parameters});
  }

  save(schoolObject: School) {
    this.http.post(this.schoolURL + '/save', schoolObject, httpOptionsPost).subscribe();
  }

  update(schoolObject: School) {
    this.http.put(this.schoolURL + '/update', schoolObject, httpOptionsPost).subscribe();
  }

  getSchoolsByTerm(term: string) {
    const listOfSchools = this.http.get<School[]>(this.schoolURL + '/list/' + term, httpOptions)
    .pipe(debounceTime(500),
    map((data: any) => {
      return (
        data.length !== 0 ? data as any[] : [{'School Name': 'No record found'} as any]
      );
    }));
    return listOfSchools;
  }

}
