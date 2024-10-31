import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datos-indicadores-fin',
  templateUrl: './datos-indicadores-fin.component.html',
  styleUrls: ['./datos-indicadores-fin.component.scss']
})
export class DatosIndicadoresFinComponent {
  redes: any;
  nombreSistema: any;
  alto = 100;
  esMovil = false;
  esTablet = false;
  esEscritorio = false;
  isBrowser = false;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  idIndicador: number = 0;

  graficasValores: {
    NO: number,
    ANIO: string,
    META_PLANEADA: string,
    META_ALCANZADA: string,
    RELATIVA: boolean,
    ABSOLUTA: boolean,
    INDICADORCOMPLEMENTARIO: boolean,
    META_ABS_PLANEADA: number,
    META_ABS_ALCANZADA: number,
    META_REL_PLANEADA: number,
    META_REL_ALCANZADA: number,
    GRAFICA: string
  }[] = [];

  metaPlaneada : {vM:number,vMin:number,vP:number} = {vM:0,vMin:0,vP:0};
  metaAlcnazada : {vM:number,vMin:number,vP:number} = {vM:0,vMin:0,vP:0};

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private servicio: DataDynamic,
    private breakpointObserver: BreakpointObserver,
    private ambitoService: AmbitosocialService,
    private route: ActivatedRoute
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

    this.route.paramMap.subscribe(params => {
      this.idIndicador = Number(params.get('idIndicador'));
      this.obtenerGraficasRapidas();
    });

  }
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setInterval(() => {
        let aux = this.planeacion?.nativeElement.offsetHeight;
        this.alto = aux + aux / 6;
      }, 10);
    }
  }

  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  obtenerGraficasRapidas() {
    this.ambitoService.obtenerHistoricoFin(this.idIndicador).subscribe(
      res => {
        this.graficasValores = res?.Data;

        let mayorMetaPlaneada  = -Infinity;
        let mayorMetaAlcanzada = -Infinity;
        let menorMetaAlcanzada = Infinity;
        let menorMetaPlaneada = Infinity;
        let totalMetaAlcanzada = 0;
        let totalMetaPlaneada = 0;
        let countAlcanzada = 0;
        let countPlaneada = 0;

        this.graficasValores.forEach(grafica => {
          // Validar y convertir META_ALCANZADA a número si es válido
          const metaAlcanzada = grafica.META_ALCANZADA !== "-" ? Number(grafica.META_ALCANZADA) : null;
          const metaPlaneada = grafica.META_PLANEADA !== "-" ? Number(grafica.META_PLANEADA) : null;
        
          // Procesar META_ALCANZADA si es un valor válido
          if (metaAlcanzada !== null) {
            totalMetaAlcanzada += metaAlcanzada;
            countAlcanzada++;
            mayorMetaAlcanzada = Math.max(mayorMetaAlcanzada, metaAlcanzada);
            menorMetaAlcanzada = Math.min(menorMetaAlcanzada, metaAlcanzada);
          }
        
          // Procesar META_PLANEADA si es un valor válido
          if (metaPlaneada !== null) {
            totalMetaPlaneada += metaPlaneada;
            countPlaneada++;
            mayorMetaPlaneada = Math.max(mayorMetaPlaneada, metaPlaneada);
            menorMetaPlaneada = Math.min(menorMetaPlaneada, metaPlaneada);
          }
        });

        this.metaPlaneada.vM = mayorMetaPlaneada;
        this.metaPlaneada.vMin = menorMetaPlaneada;

        this.metaAlcnazada.vM = mayorMetaAlcanzada
        this.metaAlcnazada.vMin = menorMetaAlcanzada

        // Calcular los promedios
       // Calcular los promedios solo si hay valores válidos
        let promedioMetaAlcanzada = countAlcanzada > 0 ? Math.round((totalMetaAlcanzada / countAlcanzada) * 100) / 100 : 0;
        let promedioMetaPlaneada = countPlaneada > 0 ? Math.round((totalMetaPlaneada / countPlaneada) * 100) / 100 : 0;

        this.metaAlcnazada.vP = promedioMetaAlcanzada;
        this.metaPlaneada.vP = promedioMetaPlaneada;
      }
    )
  }
}
