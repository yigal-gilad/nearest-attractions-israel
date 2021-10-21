import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from "./consts/url";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  getAttractions(lon: number, lat: number, category: string): Observable<any> {
    return this.http.get<any>(URL + "getattractions/?lon=" + lon +
      "&lat=" + lat + "&category=" + category);
  }
}
