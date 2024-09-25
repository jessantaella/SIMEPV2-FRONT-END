import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerConfService } from 'src/app/server-confing.service';

@Injectable({
  providedIn: 'root'
})
export class Indicadores1924Service {

  constructor(private http:HttpClient,private serverConfigService: ServerConfService) { }
  private cache = new Map<string, Observable<string>>();

  consultaEstadisticaBasica4T(nSector:number):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps/api/mosaicoSectores/obtenerSectores4t?idPrograma='+'0';
    return this.http.get<any>(url);
  }

  getConsultaProgramasSectoriales4T(idSector:string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps/api/sectores/consultaProgramasSectoriales4T?idPrograma='+idSector;
    return this.http.get<any>(url);
  }

  getObjetivosSectoriales4T(idPrograma:string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps-reportes/api/indicadoresSectoriales/getSPMPAEMIndicadores4T?idIndicador='+idPrograma+'&opcion=1&objetivo=0';
    return this.http.get<any>(url);
  }

  getDetallesIndicador4T(idProgramaSectorial: number, opcion: number, descObjetivo: string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps-reportes/api/indicadoresSectoriales/getSPMPAEMIndicadores4T?idIndicador='+idProgramaSectorial+'&opcion='+ opcion + '&objetivo='+ descObjetivo;
    return this.http.get<any>(url);
  }

  getHistorico4T(idPrograma:string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps/api/indicadores/detalleIndicadores4T';
    return this.http.post<any>(url, {idIndicador: idPrograma, opcion: 2});
  }
}

    