import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { ServerConfService } from '../../../app/server-confing.service';

@Injectable({
  providedIn: 'root'
})
export class AmbitosocialService {
 // servidor= 'http://devnet.coneval.org.mx:93/MS-SIMEPS/api';
 servidor = '';
 constructor(private http:HttpClient,
   private serverConfigService: ServerConfService
 ) {
   this.servidor = this.serverConfigService.getServerConfig()+'api/MS-SIMEPS/api';

  }


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

  /*descargarExcel() {
    let url = this.servidor + `/PAS1318/DescargarBasePND`;

    // Crea un iframe invisible para realizar la descarga
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // Hacer el iframe invisible
    iframe.src = url; // Asignar la URL de descarga al iframe
    document.body.appendChild(iframe); // Agregar el iframe al cuerpo del documento

    // Remover el iframe después de un corto tiempo para limpiar el DOM
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Eliminar el iframe después de 1 segundo
  }*/

    obtenerUrlDescarga(): Observable<Blob> {
      let url= `${this.servidor}/PAS1318/DescargarBasePND`;
      return this.http.get(url, { responseType: 'blob' });
    }

    descargarBDExcelID(id: number): Observable<Blob> {
      let url = this.servidor+`/PAS1318/DescargarBasePND?id=${id}`;
      return this.http.get(url, {
        responseType: 'blob'});
    }

    descargarBDCsvID(id: number): Observable<Blob> {
      let url = this.servidor+`/PAS1318/DescargarBasePND?id=${id}&tipo=2`;
      return this.http.get(url, {responseType: 'blob'});
    }

    descargarFichaTecnica1924(id: number, idIndicador: number): Observable<Blob> {
      let url = this.servidor+`/PAS1924/DescargarFichaTecnica?parametros.id=${id}&parametros.idIndicador=${idIndicador}`;
      return this.http.get(url, { responseType: 'blob' });
    }  

    descargarFichaTecnica1318(id: number, idIndicador: number) {      
      let url = this.servidor+`/PAS1318/DescargarFichaTecnica?parametros.id=${id}&parametros.idIndicador=${idIndicador}`;
      return this.http.get(url, { responseType: 'blob' });
    }
    
    descargarFichasTecnicas1318(id: number, idIndicador: number) {
      let url = this.servidor+`/PAS1318/DescargarFichasTecnicas?parametros.id=${id}&parametros.idIndicador=${idIndicador}`;
      return this.http.get(url, { responseType: 'blob' });
    }

    obtenerUrlReporteHistorico1318(): Observable<any> {
      let url = this.servidor+`/PAS1318/Parametros?sNombreParametro=URL_REPORTE_HISTORICO_IND_FIN`;
      return this.http.get<any>(url);
    }

    descargarIndicadoresFin(anioSeleccionado: String, tipo: number): Observable<Blob> {
      const url = this.servidor+`/PAS1318/DescargarDBIndicadoresFin?parametros.ramo=0&parametros.ciclo=${anioSeleccionado}&parametros.matriz=0&parametros.indicador=0&parametros.nivel=1&parametros.tipo=${tipo}`;
      return this.http.get(url, { responseType: 'blob' });
    }

    descargarFichaIndicador(ramo: string, ciclo: number, matriz: number, idIndicador: number, nivel: number) {
      let url = this.servidor+`/PAS1318/DescargarFichaIndicadores?parametros.ramo=${ramo}&parametros.ciclo=${ciclo}&parametros.matriz=${matriz}&parametros.indicador=${idIndicador}&parametros.nivel=${nivel}`;
      return this.http.get(url, {
        observe: 'response',  // Necesitamos los encabezados de la respuesta
        responseType: 'blob' // Aseguramos que la respuesta sea un blob
      }).pipe(
        map(response => {
          // Extraer el nombre del archivo desde el header 'Content-Disposition'
          const contentDisposition = response.headers.get('content-disposition');  
          let fileName = 'Archivo desconocido'; // Valor por defecto
  
          if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename=(.+)/);
            if (fileNameMatch) {
              fileName = fileNameMatch[1]; // Extraemos el nombre del archivo
            }
          }     
  
          // Retornar tanto el blob como el nombre del archivo
          return {
            fileName,
            fileBlob: response.body
          };
        })
      );
    }
}
