import { DOCUMENT, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DataDynamic } from '../services/dinamic-data.services';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { WINDOW } from '../services/window.service';
import { environment } from 'src/environments/environment';
import { Sector } from '../Models/Sector';
import { EstadisticasBasicas } from '../Models/EstadisticasBasicass';
import { ProgramaSectorial } from '../Models/ProgramaSectorial';

@Component({
  selector: 'app-indicador-sectorial1924',
  templateUrl: './indicador-sectorial1924.component.html',
  styleUrls: ['./indicador-sectorial1924.component.scss']
})
  
export class IndicadorSectorial1924Component implements OnInit, AfterViewInit{
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
  programaSectorialSelected = 'Desarrollo Agropecuario';
  plantilla = '';

  listaSectores: Sector[] = [
    { ID_SECTOR: 1, NOMBRE: 'Desarrollo Agropecuario', ICONO: 'icono_desarrolloagropecuario.jpg' },
    { ID_SECTOR: 2, NOMBRE: 'Desarrollo Económico', ICONO: 'icono_desarrolloeconomico.jpg' },
    { ID_SECTOR: 3, NOMBRE: 'Desarrollo Social', ICONO: 'icono_desarrollosocial.jpg' },
    { ID_SECTOR: 4, NOMBRE: 'Desarrollo Urbano', ICONO: 'icono_desarrollourbano.jpg' },
    { ID_SECTOR: 5, NOMBRE: 'Educación', ICONO: 'icono_educacion.jpg' },
    { ID_SECTOR: 6, NOMBRE: 'Igualdad de Género', ICONO: 'icono_igualdadgenero.jpg' },
    { ID_SECTOR: 7, NOMBRE: 'Medio Ambiente', ICONO: 'icono_medioambiente.jpg' },
    { ID_SECTOR: 8, NOMBRE: 'Otros', ICONO: 'icono_otros.jpg' },
    { ID_SECTOR: 9, NOMBRE: 'Salud', ICONO: 'icono_salud.jpg' },
    { ID_SECTOR: 10, NOMBRE: 'Trabajo y Previsión Social', ICONO: 'icono_trabajo.jpg' }
  ];
  idSector: string | null = null;

  listaEstadisticasBasicasSector: EstadisticasBasicas[] =[
    {
      CONTEO: 10,
      TIPO: 'SECTORES'
    },
    {
      CONTEO: 10,
      TIPO: 'PROGRAMAS DERIVADOS'
    },
    {
      CONTEO: 10,
      TIPO: 'METAS PARA EL BIENESTAR'
    },
    {
      CONTEO: 10,
      TIPO: 'PARÁMETROS'
    },
  ];

  listaProgramasSectoriales: ProgramaSectorial[] =[
    {
      URL_ICONO: 'https://www.coneval.org.mx/SiteCollectionImages/SIMEPS/LogosPS/LogosPS20192024/iconos-simeps2020_05agriculturayrural.jpg',
      NOMBRE: 'Programa Sectorial de Agricultura y Desarrollo Rural',
      ID_PROG_SECTORIAL: 5,
      ID_SECTOR: 1,
    },
    {
      URL_ICONO: 'https://www.coneval.org.mx/SiteCollectionImages/SIMEPS/LogosPS/LogosPS20192024/iconos-simeps2020_17desruralsustentable.jpg',
      NOMBRE: 'Programa Especial Concurrente para el Desarrollo Rural Sustentable',
      ID_PROG_SECTORIAL: 15,
      ID_SECTOR: 1,
    },
    
  ];
  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: any,
    private scroller: ViewportScroller,
    private servicio: DataDynamic,
    private router: Router,
    private route: ActivatedRoute,
    
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
    this.route.queryParams.subscribe(params => {
      this.idSector = params['idSector'];  // Aquí obtienes el valor de idSector
    });
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      document.body.scrollTop = 0;
      let pos = this.scroller.getScrollPosition();
      if (pos[1] > 0) {
        this.scroller.scrollToPosition([0, 0]);
      }
    }
  }
  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        console.log(res);
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  
  
}
