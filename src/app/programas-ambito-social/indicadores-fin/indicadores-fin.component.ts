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

}
