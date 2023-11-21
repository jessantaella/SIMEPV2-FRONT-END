import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDynamic {
  private headers: HttpHeaders = new HttpHeaders();

constructor(private http:HttpClient){
  this.headers = new HttpHeaders({'Content-Type': 'application/json'});
}

  getInformacion(): Observable<any> {
    //const url:string = "http://127.0.0.1:5500/dist/configuracion.json";
    const url:string = "http://10.1.15.180:81/conf/configuracion.json";
 
    return this.http.get<any>(url,{ headers: this.headers });
  }
}
