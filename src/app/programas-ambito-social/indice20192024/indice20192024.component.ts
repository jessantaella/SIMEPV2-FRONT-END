import { Component, ElementRef, Inject,  PLATFORM_ID, ViewChild } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indice20192024',
  templateUrl: './indice20192024.component.html',
  styleUrls: ['./indice20192024.component.scss']
})
export class Indice20192024Component {
  nombreSistema: any;
  redes: any;
  fontSizeTitulo = '24px';
  fontSizeTituloNormal = '20px';

  color :string[] = ['#0302C4','#1F5897','#2B82BA','#23B4AE'];

  alto=100;
  isBrowser = false;
  esMovil = false;
  esTablet = false;
  esEscritorio = false;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  imgNube='';

  listaEstadisticasBasicas: any[] =[];
  listaSectores: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private servicio: DataDynamic,
    private ambitosocialService1924:AmbitosocialService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ){
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    if (this.isBrowser) {
        this.generarUrlImagen();
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

  consultaEstadisticasBasicas(){
    this.ambitosocialService1924.getEstadisticasBasicas1924(0).subscribe(
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

  consultaSectores(){
    this.ambitosocialService1924.getSectores1924(0).subscribe(
      res=>{
        console.log(res?.Data);
        this.listaSectores = res?.Data;
      })
  }

  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        console.log(this.nombreSistema);
        this.redes = res.generales.redes;
      });
    }
  }

  redirigirAIndicador(idSector: string) {
    this.router.navigate(['/DetalleIndicador19-24', idSector]);
  }

  generarUrlImagen() {
    const baseUrl = this.servicio.getInfoImg('');
    this.imgNube= `${baseUrl}Icons-new%20DB/NUBE.jpg`;
  }

}
