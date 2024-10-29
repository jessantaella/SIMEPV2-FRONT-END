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

  getEstadisticasBasicasDetalleIndicador(idProgramaSectorial:number):Observable<any>{
    let url = this.servidor+'/PAS1318/ContadorIndicadoresObjetivos?idProgramaSectorial='+idProgramaSectorial;
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

    //endpoint 2019-2024

    getEstadisticasBasicas1924(nSector:number):Observable<any>{
      let url = this.servidor+'/PAS1924/EstadisticasBasicas?nSector='+nSector;
      return this.http.get<any>(url);
    }

    getSectores1924(idSector:number):Observable<any>{
      let url = this.servidor+'/PAS1924/Sectores?idSector='+idSector;
      return this.http.get<any>(url);
    }

    getTodosProgramasSectoriales1924():Observable<any>{
      let url = this.servidor+'/PAS1924/ProgramasSectoriales?idProgramaSectorial=-1&bProgramSec=false';
      return this.http.get<any>(url);
    }

    getinformacionIndicador1924(idIndicador:number):Observable<any>{
      let url = this.servidor+`/PAS1924/DetalleIndicador?idIndicador=${idIndicador}&opcion=1`;
      return this.http.get<any>(url);
    }

    getObjetivosSectoriales1924(idProgramaSectorial:number):Observable<any>{
      let url = this.servidor+'/PAS1924/ObjetivosSectoriales?idProgramaSectorial='+idProgramaSectorial;
      return this.http.get<any>(url);
    }

    getOpcionesObjetivosSectoriales1924(idProgramaSectorial:number,descObjetivo:string,numObjetivo:number):Observable<any>{
      let url = this.servidor+`/PAS1924/IndicadoresSectoriales?idProgramaSectorial=${idProgramaSectorial}&opcion=2&descObjetivo=${descObjetivo}&numObjetivo=${numObjetivo}`;
      return this.http.get<any>(url);
    }

    getEstadisticasBasicasDetalleIndicador1924(idProgramaSectorial:number):Observable<any>{
      let url = this.servidor+'/PAS1924/ContadorIndicadoresObjetivos?idProgramaSectorial='+idProgramaSectorial;
      return this.http.get<any>(url);
    }
}
