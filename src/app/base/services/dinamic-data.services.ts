import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataDynamic {
  isBrowser = false;
  //servidor = "http://10.1.15.102:81/conf/configuracion.json"; //DEV
  //servidor = "https://qa.coneval.org.mx/conf/configuracion.json" //QA
  servidor = "https://sistemas.coneval.org.mx/conf/configuracion.json" // Prod


constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId:any){
}

  getInformacion(): Observable<any> {
    const headers = new HttpHeaders()
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
    //const url:string = "http://127.0.0.1:5500/dist/configuracion.json";
    const url:string = this.servidor;
    return this.http.get<any>(url,{ headers: headers });
    }else{
      const url:string = this.servidor;
      return this.http.get<any>(url,{ headers: headers });
    }
  }
}
