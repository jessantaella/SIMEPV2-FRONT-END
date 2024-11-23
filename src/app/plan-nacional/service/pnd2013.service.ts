import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerConfService } from 'src/app/server-confing.service';

@Injectable({
  providedIn: 'root'
})
export class Pnd2013Service {



  //http://10.1.15.101:8000/api/MS-SIMEPS/api/PND1318/MetasNacionales

  //servidor= 'http://devnet.coneval.org.mx:93/MS-SIMEPS/api';
servidor='';

  constructor(private http:HttpClient, private serverConfigService: ServerConfService)
   {
    this.servidor = this.serverConfigService.getServerConfig()+'api/MS-SIMEPS/api';
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


  obtenerHistoricoIndicadoresObjetivo(idMetaNacional:number,idObjetivo:number,unidadMedida:string,nombreIndicador:string):Observable<any>{
    let url = this.servidor+'/PND1318/HistoricoIndicadoresObjetivo?idMetaNacional='+idMetaNacional+'&idObjetivo='+idObjetivo+'&nombreIndicador='+nombreIndicador+'&unidadMedida='+unidadMedida;
    return this.http.get<any>(url);
  }

  obtenerHistoricoIndicadoresTransversal(nombreIndicador:string):Observable<any>{
    let url = this.servidor+'/PND1318/HistoricoIndicadoresTransversales?nombreIndicador='+nombreIndicador;
    return this.http.get<any>(url);
  }

}
