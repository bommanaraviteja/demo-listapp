import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

/*
    The ListService class
    * calls todomotto apis to get the list of items
    * calls todomotto apis to filter the list 
*/
@Injectable({
  providedIn: 'root'
})
export class ListService {

  baseUrl: string = "https://api.publicapis.org";

  constructor(private http: HttpClient) { }

  //Calls the todomotto api to get the list of items
  list(): Observable<any> {
    return this.http.get(this.baseUrl + '/entries?category=animals&https=true')
      .pipe(map((res: Response) => res))
      //...errors if any
      .pipe(catchError((error: any) => Observable.throw('Error Occured')));
  }

  //Calls the todomotto api to filter the list
  search(text: any): Observable<any> {
    return forkJoin(this.http.get(this.baseUrl + '/entries?category=animals&https=true&title=' + text)
      .pipe(map((res: Response) => res))
      //...errors if any
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error')))
      ,
      this.http.get(this.baseUrl + '/entries?category=animals&https=true&description=' + text)
        .pipe(map((res: Response) => res))
        //...errors if any
        .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error')))
    );
  }



}
