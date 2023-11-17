import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataDynamic {
constructor(private http:HttpClient){}

  getInformacion(){
    //const url:string = "http://127.0.0.1:5500/dist/configuracion.json";
    const url:string = "http://10.1.15.180/Configuracion/configuracion.json";
    return this.http.get<any>(url);
  }
}
