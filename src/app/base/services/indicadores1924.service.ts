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

  getIndicadorObjetivos4T(idProgramaSectorial: number, opcion: number, descObjetivo: string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps-reportes/api/indicadoresSectoriales/getSPMPAEMIndicadores4T?idIndicador='+idProgramaSectorial+'&opcion='+ opcion + '&objetivo='+ descObjetivo;
    return this.http.get<any>(url);
  }

  getDetallesIndicador4T(idIndicador:number, opcion: number):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps/api/indicadores/detalleIndicadores4T';
    return this.http.post<any>(url, {idIndicador: idIndicador, opcion: opcion});
  }

  getSPDerechoSocialInd4T(idIndicador:number):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps-reportes/api/indicadores/derechoSocialInd4T?idIndicador=' +idIndicador ;
    return this.http.get<any>(url);
  }

  getSPMPAEMContadorIndicadores4T(idPrograma:string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps-reportes/api/indicadoresSectoriales/getSPMPAEMContadorIndicadores4T?idProgramaSectorial=' +idPrograma ;
    return this.http.get<any>(url);
  }
}

    