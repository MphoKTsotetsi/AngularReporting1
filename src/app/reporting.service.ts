import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent} from 'rxjs'
import{map,filter,debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private _http: HttpClient) { }

  getReportingData(selection)
  {
    return this._http.get ("http://localhost54843//api/Report/getReportData?courseSelection="+selection).pipe(map(result => result));
  }
}
