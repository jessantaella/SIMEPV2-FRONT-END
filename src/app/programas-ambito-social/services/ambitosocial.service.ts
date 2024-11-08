import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getGraficaIndicadores(idIndicador:number):Observable<any>{
    let url = this.servidor+`/PAS1318/MetasIndicador?idIndicador=${idIndicador}&opcion=2`;
    return this.http.get<any>(url);
  }

  getDerechoSocialIndicador(idIndicador:number):Observable<any>{
    let url = this.servidor+`/PAS1318/DerechoSocialIndicador?idIndicador=${idIndicador}`;
    return this.http.get<any>(url);
  }


  obtenerCiclosFin():Observable<any>{
    let url = this.servidor+`/PAS1318/Ciclos?sPantalla=A`;
    return this.http.get<any>(url);
  }

  obtenerImagenesFin(pCiclo:string):Observable<any>{
    let url = this.servidor+`/PAS1318/Mosaicos?pCiclo=${pCiclo}&pCamino=A&pMosaicoFin=true`;
    return this.http.get<any>(url);
  }


  obtenerDatosFinTabla(dIndicador:number,idMatriz:number,nivel:number):Observable<any>{
    let url = this.servidor+`/PAS1318/Indicador?idMatriz=${idMatriz}&nivel=${nivel}&idNivel=0&dIndicador=${dIndicador}`;
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

  getGraficaIndicadores1924(idIndicador:number):Observable<any>{
    let url = this.servidor+`/PAS1924/MetasIndicador?idIndicador=${idIndicador}&opcion=2`;
    return this.http.get<any>(url);
  }
  getDerechoSocialIndicador1924(idIndicador:number):Observable<any>{
    let url = this.servidor+`/PAS1924/DerechoSocialIndicador?idIndicador=${idIndicador}`;
    return this.http.get<any>(url);
  }
  obtenerlistadoIndicadoresPoliticaSocial(pCiclo:string,ramo:string,pUnidad:string):Observable<any>{
    let url = this.servidor+`/PAS1318/ProgramasFin?pCiclo=${pCiclo}&pRamo=${ramo}&pUnidad=${pUnidad}`;
    return this.http.get<any>(url);
  }
  obtenerAniosFichas():Observable<any>{
    let url = this.servidor+`/PAS1318/CiclosFichasMonitoreo`;
    return this.http.get<any>(url);
  }

  obtenerFichasxAnio(iCiclo:number):Observable<any>{
    let url = this.servidor+`/PAS1318/FichasMonitoreo?iCiclo=${iCiclo}`;
    return this.http.get<any>(url);
  }

  obtenerHistoricoFin(idIndicador:number):Observable<any>{
    let url = this.servidor+`/PAS1318/Historico?dIndicador=${idIndicador}`;
    return this.http.get<any>(url);
  }

  descargarExcel(): Observable<Blob> {
    let url = this.servidor+`/PAS1318/DescargarBasePND`;

    // Configuramos los headers, aunque 'Access-Control-Allow-Origin' generalmente se configura en el servidor
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.get(url, {
      headers: headers,
      responseType: 'blob' // Especifica que la respuesta es un blob (archivo binario)
    });
  }

    descargarBDExcelID(id: number): Observable<Blob> {
      let url = this.servidor+`/PAS1318/DescargarBasePND?id=${id}`;
      return this.http.get(url, {
        responseType: 'blob' // Especifica que la respuesta es un blob (archivo binario)
      });
    }

    descargarBDCsvID(id: number): Observable<Blob> {
      let url = this.servidor+`/PAS1318/DescargarBasePND?id=${id}&type=2`;
      return this.http.get(url, {
        responseType: 'blob'
      });
    }

    descargarFichaTecnica1924(id: number, idIndicador: number): Observable<Blob> {
    let url = this.servidor+`/PAS1924/DescargarFichaTecnica?parametros.id=${id}&parametros.idIndicador=${idIndicador}`;
    return this.http.get(url, { responseType: 'blob' });
    }

    descargarFichaTecnica1318(id: number, idIndicador: number) {
      let url = this.servidor+`/PAS1318/DescargarFichaTecnica?parametros.id=${id}&parametros.idIndicador=${idIndicador}`;
      return this.http.get(url, { responseType: 'blob' });
    }

    obtenerUrlReporteHistorico1318(): Observable<any> {
      let url = this.servidor+`/PAS1318/Parametros?sNombreParametro=URL_REPORTE_HISTORICO_IND_FIN`;
      return this.http.get<any>(url);
    }

    descargarFichaIndicadores(anioSeleccionado: String): Observable<Blob> {
      const url = this.servidor+`/PAS1318/DescargarFichaIndicadores?parametros.ramo=14&parametros.ciclo=${anioSeleccionado}&parametros.matriz=24000070&parametros.indicador=24003322&parametros.nivel=1`;
      return this.http.get(url, { responseType: 'blob' });
    }
}
