import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sector } from 'src/app/base/Models/Sector';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { Indicadores1924Service } from 'src/app/base/services/indicadores1924.service';
import { AmbitosocialService } from '../services/ambitosocial.service';

@Component({
  selector: 'app-indice20132018',
  templateUrl: './indice20132018.component.html',
  styleUrls: ['./indice20132018.component.scss']
})
export class Indice20132018Component {
  nivelSeleccionado: any;
  menuSeleccionado = 1;
  redes: any;
  nombreSistema: any;
  auxMascara = false;
  fontSizeTitulo = '24px';
  fontSizeTituloNormal = '20px';
  isBrowser = false;
  celular = false;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  alto=100;
  esMovil = false;
  esTablet = false;
  esEscritorio = false;

  color :string[] = ['#0302C4','#1F5897','#2B82BA','#23B4AE'];

  plantilla = '';

  // Objetos utilizados en vista
  listaEstadisticasBasicas: any[] =[];
  listaSectores: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private servicio: DataDynamic,
    private router: Router,
    private ambitosocialService:AmbitosocialService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    if (this.isBrowser) {
      this.breakpointObserver
        .observe(['(max-width: 576px)', '(min-width: 577px) and (max-width: 1200px)', '(min-width: 1201px)'])
        .subscribe((result: BreakpointState) => {
          if (result.breakpoints['(max-width: 576px)']) {
            this.esMovil = true;
            this.esTablet = false;
            this.esEscritorio = false;
          } else if (result.breakpoints['(min-width: 577px) and (max-width: 1200px)']) {
            this.esMovil = false;
            this.esTablet = true;
            this.esEscritorio = false;
          } else if (result.breakpoints['(min-width: 1201px)']) {
            // Code for resolution greater than or equal to 993px
            this.esMovil = false;
            this.esTablet = false;
            this.esEscritorio = true;
          }
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

  ngOnInit(): void {
    this.consultaEstadisticasBasicas();
    this.consultaSectores();
  }
  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  // --------- Graficas de colores

  consultaEstadisticasBasicas(){
    this.ambitosocialService.getEstadisticasBasicas(0).subscribe(
      res=>{
        this.listaEstadisticasBasicas = res?.Data.map((estadistica: { Tipo: string; Conteo: number }) => ({
          ...estadistica,
          currentCount: 0
        }));
        this.startCounters();
      console.log(res);
    })
  }

  startCounters(): void {
    this.listaEstadisticasBasicas.forEach((estadistica, index) => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        estadistica.currentCount = count;
        if (count === estadistica.Conteo) {
          clearInterval(interval); // Detener el contador cuando llegue al valor deseado
        }
      }, 5); // Velocidad del contador (5 ms entre incrementos)
    });
  }

  getColor(index: number): string {
    return this.color[index % this.color.length];
  }

  // --------- Termina Graficas de colores
  // --------- Inicia función de Monitoreo

  consultaSectores(){
    this.ambitosocialService.getSectores(0).subscribe(
      res=>{
        console.log(res?.Data);
        this.listaSectores = res?.Data;
      })
  }

  redirigirAIndicador(idSector: string) {
    this.router.navigate(['/DetalleIndicador', idSector]);
  }

    
}
