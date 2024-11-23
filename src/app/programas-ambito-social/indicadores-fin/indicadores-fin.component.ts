import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { AmbitosocialService } from '../services/ambitosocial.service';

@Component({
  selector: 'app-indicadores-fin',
  templateUrl: './indicadores-fin.component.html',
  styleUrls: ['./indicadores-fin.component.scss']
})
export class IndicadoresFinComponent {

  redes: any;
  nombreSistema: any;
  alto=100;
  esMovil = false;
  esTablet = false;
  esEscritorio = false;
  isBrowser = false;
  @ViewChild('planeacion') planeacion!: ElementRef;
  imgDescarga='';
  imgDescargaCsv='';
  ciclos:{CICLO_VALUE:string,CICLO_ID:number} []= [];
  anioSeleccionado: string = '';
  mosaico: { NOM_ARCHIVO:string,LVL:number,CICLO:string,RAMO:string,UNIDAD:string,LIGA:string,DESCRIPCION:string,DEPENDENCIA:string}[]=[];


constructor(
  @Inject(PLATFORM_ID) private platformId: any,
  private ambitoService:AmbitosocialService,
  private servicio: DataDynamic,
){
  this.isBrowser = isPlatformBrowser(this.platformId);
  this.consultarData();
  this.obtenerCiclos();
}

consultarData() {
  if (this.isBrowser) {
    this.cargarImg();
    this.servicio.getInformacion().subscribe((res) => {
      this.nombreSistema = res?.simeps?.opciones[1].titulo;
      this.redes = res.generales.redes;
    });
  }
}

ngAfterViewInit(): void {
  if (this.isBrowser) {
    setInterval(() => {
      let aux = this.planeacion?.nativeElement.offsetHeight;
      this.alto = aux + aux / 6;
    }, 10);
  }
}

obtenerCiclos(){
  this.ambitoService.obtenerCiclosFin().subscribe(
    res=>{
      this.ciclos = res?.Data;
      this.anioSeleccionado = this.ciclos[this.ciclos.length-1].CICLO_VALUE;
      this.obtenerMosaico();
    }
  )
}

obtenerMosaico(){
  this.ambitoService.obtenerImagenesFin(this.anioSeleccionado).subscribe(
    res=>{
        this.mosaico = res?.Data.filter((item: { RAMO: string; }) => item.RAMO !== "33");

    }
  )
}


seleccionarCiclo(ciclo:string){
  this.anioSeleccionado = ciclo;
  this.ambitoService.obtenerImagenesFin(ciclo).subscribe(
    res=>{
      this.mosaico = res?.Data.filter((item: { RAMO: string; }) => item.RAMO !== "33");

    }
  )
}

descargarArchivo(fileType: string) {
  this.ambitoService.obtenerUrlReporteHistorico1318().subscribe({
    next: (response) => {
      if (response.Success && response.Data.length > 0) {
        const urlBase = response.Data[0].VALOR;  // Obtienes la URL base
        const urlCompleta = `${urlBase}Base_historica_fin_${this.anioSeleccionado}.${fileType}`;
        console.log('urlCompleta'+ urlCompleta);

        const link = document.createElement('a');
        link.href = urlCompleta;  // URL completa para la descarga
        link.download = `Base_historica_fin_${this.anioSeleccionado}..${fileType}`;
        link.click();
      } else {
        console.error('Error: No se pudo obtener la URL base');
      }
    },
    error: (err) => {
      console.error('Error al obtener la URL base:', err);
    }
  });
}

descargarArchivo2(tipoArchivo: 'xls' | 'csv') {
  this.ambitoService.descargarFichaIndicadores(this.anioSeleccionado).subscribe({
    next: (blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
            if (tipoArchivo === 'xls') {
        link.href = `${fileURL}`;
        link.download = `Detalle_Ficha_Indicador_${this.anioSeleccionado}_14_E_005_1_24003322.xls`;
        console.log("link" + link.download);
      } else if (tipoArchivo === 'csv') {
        link.href = `${fileURL}`;
        link.download = `Detalle_Ficha_Indicador_${this.anioSeleccionado}_14_E_005_1_24003322.csv`;
        console.log("link" + link.download);

      }

      link.click();
      window.URL.revokeObjectURL(fileURL);
    },
    error: (err) => {
      console.error('Error al descargar el archivo:', err);
    }
  });
}

cargarImg() {
  this.imgDescarga = this.servicio.getImagen('descarga_excel.jpg');
  this.imgDescargaCsv=this.servicio.getImagen('descarga_csv.jpg');
  }


}
