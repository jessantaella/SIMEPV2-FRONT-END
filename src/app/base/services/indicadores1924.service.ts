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

  getConsultaProgramasSectoriales4T(idPrograma:string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/simeps/api/sectores/consultaProgramasSectoriales4T?idPrograma='+idPrograma;
    return this.http.get<any>(url);
  }
}

    