import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pnd2013Service {



  servidor= 'http://devnet.coneval.org.mx:93/MS-SIMEPS/api';

  constructor(private http:HttpClient) {
   }

   getConsultaMetasNacionales():Observable<any>{
    let url = this.servidor+'/PND1318/MetasNacionales';
    return this.http.get<any>(url);
  }

  getObjetivosMetasNacionales(idMetaNacional:number):Observable<any>{
    let url = this.servidor+'/PND1318/ObjetivosDeMeta?idMetaNacional='+idMetaNacional;
    return this.http.get<any>(url);
  }

  getObjetivosTransversales():Observable<any>{
    let url = this.servidor+'/PND1318/IndicadoresTransversales';
    return this.http.get<any>(url);
  }

  getIndicadoresObjetivoDeMeta(idMetaNacional:number):Observable<any>{
    let url = this.servidor+'/PND1318/IndicadoresObjetivoDeMeta?idMetaNacional='+idMetaNacional;
    return this.http.get<any>(url);
  }


  obtenerHistoricoIndicadoresObjetivo(idMetaNacional:number,idObjetivo:number,unidadMedida:string):Observable<any>{
    let url = this.servidor+'/PND1318/HistoricoIndicadoresObjetivo?idMetaNacional='+idMetaNacional+'&idObjetivo='+idObjetivo+'&unidadMedida='+unidadMedida;
    return this.http.get<any>(url);
  }

}
