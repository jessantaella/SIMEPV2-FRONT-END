import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-fichas-monitoreo',
  templateUrl: './fichas-monitoreo.component.html',
  styleUrls: ['./fichas-monitoreo.component.scss']
})
export class FichasMonitoreoComponent implements OnInit,OnDestroy{

  redes: any;
  nombreSistema: any;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  alto=100;
  esTablet = false;
  isBrowser = false;
  posicionInicial = 0;
  faChevronRight=faChevronRight;
  faChevronLeft=faChevronLeft;
  intervalo: any;
  tiempo=5150;
  cicloSeleccionado = 0;
  indicadores: boolean[] = [];

  tamanioBloque: number = 4; // Número de imágenes por bloque
  bloques: number[] = []; // Arreglo para los indicadores
  bloqueActivo: number = 0;

  anios: {
    CICLO: number;
    ID_PROG_SECTORIAL: number;
    URL_PORTADA: string | null;
    URL_FICHA: string | null;
    COLOR_CICLO: string;
  }[] = [];

  fichas: {
    CICLO: number;
    ID_PROG_SECTORIAL: number;
    URL_PORTADA: string;
    URL_FICHA: string;
    COLOR_CICLO: string;
  }[] = [];

  arregloVisible : {
    CICLO: number;
    ID_PROG_SECTORIAL: number;
    URL_PORTADA: string;
    URL_FICHA: string;
    COLOR_CICLO: string;
  }[] = [];

  constructor(
    private ambitoService: AmbitosocialService,
    @Inject(PLATFORM_ID) private platformId: any,
    private servicio: DataDynamic
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.obtenerAnios();
    this.validarArreglosVisiblesIzquierda(0);
  }


  ngOnInit(): void {
    this.iniciarIntervalo();
    this.actualizarIndicadores();
    this.consultarData();
  }

  ngOnDestroy(): void {
    this.limpiarIntervalo();
  }

  iniciarIntervalo(): void {
    this.limpiarIntervalo(); // Asegurarse de que no hay otro intervalo en ejecución
    this.intervalo = setInterval(() => {
      this.siguiente();
    }, this.tiempo); // Cambia 5000 por el tiempo que necesites
  }

  limpiarIntervalo(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }


  obtenerAnios(){
    this.ambitoService.obtenerAniosFichas().subscribe(
      res=>{
        this.anios = res?.Data;
        this.cicloSeleccionado = 2016;
        this.obtenerFichas(this.cicloSeleccionado);
      }
    )
  }

  obtenerFichas(anio:number){
    this.ambitoService.obtenerFichasxAnio(anio).subscribe(
      res=>{
          this.fichas = res?.Data;
          this.calcularBloques(); // Recalcula bloques después de obtener las fichas
    this.validarArreglosVisiblesIzquierda(this.posicionInicial);
      }
    )
  }

  siguiente() {
    this.posicionInicial = (this.posicionInicial + 1) % this.fichas.length;
    this.validarArreglosVisiblesIzquierda(this.posicionInicial);
    this.actualizarIndicadores();
}

anterior() {
    this.posicionInicial = (this.posicionInicial - 1 + this.fichas.length) % this.fichas.length;
    this.validarArreglosVisiblesDerecha(this.posicionInicial);
    this.actualizarIndicadores();
}

  validarArreglosVisiblesIzquierda(posIni:number){
    this.arregloVisible = [];
    for(let a=0;a<4;a++){
      if(posIni>this.fichas.length-1){
        posIni = 0;
      }
      this.arregloVisible.push(this.fichas[posIni]);
      posIni++;
    }
  }


  validarArreglosVisiblesDerecha(posIni: number) {
    this.arregloVisible = [];
    let aux= [];
    for(let a=0;a<4;a++){
      if(posIni<0){
        posIni = this.fichas.length-1;
      }
      aux.push(this.fichas[posIni]);
      posIni--;
    }
    this.arregloVisible = aux.reverse();
  }


  seleccionaCiclo(ciclo:number){
    this.cicloSeleccionado = ciclo;
    this.fichas = [];
    this.obtenerFichas(ciclo);
  }



  actualizarIndicadores(): void {
    this.bloqueActivo = Math.floor(this.posicionInicial / this.tamanioBloque);
  }


  calcularBloques() {
    const totalImagenes = this.fichas.length;
    const numBloques = Math.ceil(totalImagenes / this.tamanioBloque);
    this.bloques = Array.from({ length: numBloques }, (_, i) => i);
  }

  irABloque(indice: number) {
    this.bloqueActivo = indice;
    this.posicionInicial = indice * this.tamanioBloque;
    this.validarArreglosVisiblesIzquierda(this.posicionInicial);
    this.actualizarIndicadores();
    this.iniciarIntervalo(); // Reinicia el intervalo automático
  }
  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.redes = res.generales.redes;
      });
    }
  }
}
