import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-detalle-informacion',
  templateUrl: './detalle-informacion.component.html',
  styleUrls: ['./detalle-informacion.component.scss']
})
export class DetalleInformacionComponent implements OnInit {

  idIndicador: number = 0;
  informacion: any;
  data:any;
  nombreIndicador:string = '';
  idProgramaSectorial: number = 0;
  isBrowser = false;

  derechosSociales:any;

  metaPlaneada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  metaAlcanzada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  desempenio: { lB: number, uVA: number, meta: number, porcentaje: number } | undefined;
  calidadIndicador: {claridad:boolean,relevancia:boolean,monitoreo:boolean,pertinencia:boolean} | undefined;
  imgDescarga ='';
  imgDesargaInd='';
  imgDescargaFicha='';
  imgDescargaCsv='';
  color='';
  imgCheck= '';
  imgWarn='';
  listaProgramasSectoriales: any[] =[];
  loadingProgramasSectoriales = true;
  nombreProgramaSeleccionado: string = '';

  constructor(private ambitosocialService: AmbitosocialService, private route: ActivatedRoute,private servicio: DataDynamic,@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.cargarImg();
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      let idIndicadorProv = params.get('idIndicador');
      if( idIndicadorProv){
        this.idIndicador = params.get('idIndicador') ? parseInt(params.get('idIndicador')!) : 0;
        this.obtenerInformacionIndicadorDetalle();
        this.obtenerInformacionGrafica();
      }else{
        let idProgramaSect = params.get('idProgramaSect') ? parseInt(params.get('idProgramaSect')!) : 0;
        this.consultaObjetivosSectoriales(idProgramaSect);
        this.idProgramaSectorial=idProgramaSect;
        this.consultaProgramasSectoriales(this.idProgramaSectorial);
      }
    });
  }

  obtenerInformacionIndicadorDetalle() {
    this.ambitosocialService.getinformacionIndicador(this.idIndicador).subscribe(
      res => {
        this.informacion = res?.Data[0];
        this.color= this.informacion.PORCENTAJE_COLOR;
        console.log('Información del indicador', this.informacion);
        this.metaPlaneada = { vMax: this.informacion?.MAX_META_PLANEADA, vMin: this.informacion?.MIN_META_PLANEADA, vPromedio: this.informacion?.AVG_META_PLANEADA };
        this.metaAlcanzada = {vMax:this.informacion?.MAX_META_ALCANZADA, vMin: this.informacion?.MIN_META_ALCANZADA,vPromedio:this.informacion?.AVG_META_ALCANZADA};
        this.desempenio = {lB:this.informacion?.VALOR_LB, uVA: this.informacion?.META_ALCANZADA,meta:this.informacion?.META, porcentaje:this.informacion?.PORCENTAJE_AVANCE}
        this.calidadIndicador = {claridad:this.informacion?.CLARIDAD,relevancia:this.informacion?.RELEVANCIA,monitoreo:this.informacion?.MONITOREABILIDAD,pertinencia:this.informacion?.PERTINENCIA}
      }
    )
  }

  obtenerInformacionGrafica(){
    this.ambitosocialService.getGraficaIndicadores(this.idIndicador).subscribe(
      res=>{
        this.data = res?.Data;
      }
    )
  }


  consultaObjetivosSectoriales(idProgramaSectorial:number){
    this.ambitosocialService.getObjetivosSectoriales(idProgramaSectorial).subscribe(
      res=>{
        console.log(res);
        let arregloAux = res?.Data;
       if(arregloAux.length>0){
        this.obtenerOpcionesSecundarias(arregloAux[0].ID_PROGRAMA_SEC,arregloAux[0].OBJETIVO,arregloAux[0].NUM_OBJETIVO);
       }
      }
    )
  }

  obtenerOpcionesSecundarias(idProgramaSectorial:number,descObjetivo:string,numObjetivo:number){
    this.ambitosocialService.getOpcionesObjetivosSectoriales(idProgramaSectorial,descObjetivo,numObjetivo).subscribe(
      res=>{
       // console.info(res);
        this.nombreIndicador = res?.Data[0]?.INDICADOR      ;
        this.idIndicador = res?.Data[0]?.ID_INDICADOR;
        this.obtenerInformacionIndicadorDetalle();
        this.obtenerInformacionGrafica();
      }
    )
  }


  obtenerDerechoSocialIndicador(){
    this.ambitosocialService.getDerechoSocialIndicador(this.idIndicador).subscribe(
      res=>{
          this.derechosSociales = res?.Data;
      }
    )
  }

  descargarBdExcelConId() {
    const nombrePrograma = this.nombreProgramaSeleccionado
    ? this.nombreProgramaSeleccionado.replace(/\s+/g, '_')
    : 'Nombre_Desconocido';

    this.ambitosocialService.descargarBDExcelID(this.idProgramaSectorial).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Base_de_Datos_${nombrePrograma}_${this.idProgramaSectorial}.xlsx`;
      console.log('URL generada:', url);
      console.log('Nombre del archivo a descargar:', link.download);
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }



  descargarBdCsv() {
    const nombrePrograma = this.nombreProgramaSeleccionado
      ? this.nombreProgramaSeleccionado.replace(/\s+/g, '_')
      : 'Nombre_Desconocido';

    this.ambitosocialService.descargarBDCsvID(this.idProgramaSectorial).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Base_de_Datos_${nombrePrograma}_${this.idProgramaSectorial}.csv`; // Nombre dinámico con el programa ajustado
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }


descargarFichaTecnica1318() {
  const nombrePrograma = this.nombreProgramaSeleccionado
  ? this.nombreProgramaSeleccionado.replace(/\s+/g, '_')
  : 'Nombre_Desconocido';

  this.ambitosocialService.descargarFichaTecnica1318(this.idProgramaSectorial, this.idIndicador)
    .subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');

      // Usar nombreProgramaSeleccionado para asignar el nombre al archivo
      a.href = url;
      a.download = `Fichas_Tecnicas_Indicadores_${nombrePrograma}_${this.idIndicador}.xls`; // Nombre dinámico con el nombre del programa
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error("Error al descargar la ficha técnica", error);
    });
}

cargarImg() {
  this.imgDescarga = this.servicio.getImagen('descarga_excel.jpg');
  this.imgDesargaInd= this.servicio.getImagen('descarga_datos3.jpg');
  this.imgDescargaFicha= this.servicio.getImagen('descarga_docdatos.jpg');
  this.imgDescargaCsv= this.servicio.getImagen('descarga_csv.jpg');
  this.imgCheck= this.servicio.getImagen('iconoindicador_02.jpg');
  this.imgWarn=this.servicio.getImagen('iconoindicador_01.jpg');
  }

  consultaProgramasSectoriales(idProgramaSect: number): void {
    this.ambitosocialService.getTodosProgramasSectoriales().subscribe({
      next: res => {
        // filtor  porID_PROG_SECTORIAL
        const programasSectoriales = res?.Data.filter(
          (programa: { ID_PROG_SECTORIAL: number }) => programa.ID_PROG_SECTORIAL === idProgramaSect
        );
        console.log('Programas sectoriales filtrados:', programasSectoriales);

        // obt pro seleccionado
        const programaSeleccionado = programasSectoriales.length > 0 ? programasSectoriales[0] : null;
        console.log('Programa seleccionado:', programaSeleccionado);
        this.nombreProgramaSeleccionado = programaSeleccionado?.NOMBRE || 'Nombre_Desconocido';
        this.listaProgramasSectoriales = programasSectoriales;
        this.loadingProgramasSectoriales = false;
      },
      error: error => {
        console.error('Error al consultar los programas sectoriales:', error);
      },
    });
  }
}
