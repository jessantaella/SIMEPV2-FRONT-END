import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmbitosocialService {
  servidor= 'http://devnet.coneval.org.mx:93/MS-SIMEPS/api';

  constructor(private http:HttpClient) { }


  getEstadisticasBasicas(nSector:number):Observable<any>{
    let url = this.servidor+'/PAS1318/EstadisticasBasicas?nSector='+nSector;
    return this.http.get<any>(url);
  }

  getSectores(idSector:number):Observable<any>{
    let url = this.servidor+'/PAS1318/Sectores?idSector='+idSector;
    return this.http.get<any>(url);
  }

  getTodosProgramasSectoriales():Observable<any>{
    let url = this.servidor+'/PAS1318/ProgramasSectoriales?idProgramaSectorial=-1&bProgramSec=false';
    return this.http.get<any>(url);
  }

  getObjetivosSectoriales(idProgramaSectorial:number):Observable<any>{
    let url = this.servidor+'/PAS1318/ObjetivosSectoriales?idProgramaSectorial='+idProgramaSectorial;
    return this.http.get<any>(url);
  }

  getOpcionesObjetivosSectoriales(idProgramaSectorial:number,descObjetivo:string,numObjetivo:number):Observable<any>{
    let url = this.servidor+`/PAS1318/IndicadoresSectoriales?idProgramaSectorial=${idProgramaSectorial}&opcion=2&descObjetivo=${descObjetivo}&numObjetivo=${numObjetivo}`;
    return this.http.get<any>(url);
  }

  getinformacionIndicador(idIndicador:number):Observable<any>{
    let url = this.servidor+`/PAS1318/DetalleIndicador?idIndicador=${idIndicador}&opcion=1`;
    return this.http.get<any>(url);
  }
}
