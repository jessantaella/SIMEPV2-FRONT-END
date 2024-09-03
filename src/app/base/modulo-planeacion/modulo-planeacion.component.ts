import { DOCUMENT, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DataDynamic } from '../services/dinamic-data.services';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { WINDOW } from '../services/window.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modulo-planeacion',
  templateUrl: './modulo-planeacion.component.html',
  styleUrls: ['./modulo-planeacion.component.scss']
})
export class ModuloPlaneacionComponent implements OnInit, AfterViewInit{
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
  alto = 100;
  parte_1_pnd = "";
  parte_2_pnd = "";
  parte_3_pnd = "";
  modulo_1 = "";
  modulo_2 = "";
  modulo_3 = "";
  modulo_4 = "";
  submodulo_1 = "";
  submodulo_2 = "";
  submodulo_3 = "";
  submodulo_4 = "";
  cambiarImagen_1 = false;
  cambiarImagen_2 = false;
  cambiarImagen_3 = false;
  cambiarImagen_4 = false;
  direccion_1 = "";
  direccion_2 = "";
  direccion_3 = "";
  esMovil = false;
  esTablet = false;
  esEscritorio = false;

  plantilla = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: any,
    private scroller: ViewportScroller,
    private servicio: DataDynamic,
    private router: Router,
    
    private breakpointObserver: BreakpointObserver,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    if (this.isBrowser) {
      this.cargarDiagrama();
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
    if (this.isBrowser) {
      document.body.scrollTop = 0;
      let pos = this.scroller.getScrollPosition();
      if (pos[1] > 0) {
        this.scroller.scrollToPosition([0, 0]);
      }
    }
  }

  cargarDiagrama() {
    this.parte_1_pnd = environment.recursos + 'diagrama-pnd/parte-1-pnd.png';
    this.parte_2_pnd = environment.recursos + 'diagrama-pnd/parte-2-pnd.png';
    this.parte_3_pnd = environment.recursos + 'diagrama-pnd/parte-3-pnd.png';
    this.modulo_1 = environment.recursos + 'diagrama-pnd/modulo-1.png';
    this.modulo_2 = environment.recursos + 'diagrama-pnd/modulo-2.png';
    this.modulo_3 = environment.recursos + 'diagrama-pnd/modulo-3.png';
    this.modulo_4 = environment.recursos + 'diagrama-pnd/modulo-4.png';
    this.submodulo_1 = environment.recursos + 'diagrama-pnd/submodulo-1.png';
    this.submodulo_2 = environment.recursos + 'diagrama-pnd/submodulo-2.png';
    this.submodulo_3 = environment.recursos + 'diagrama-pnd/submodulo-3.png';
    this.submodulo_4 = environment.recursos + 'diagrama-pnd/submodulo-4.png';

    //Direcciones
    this.direccion_1 = environment.simepsViejo + '_SIMEPS/MetasNacionales.aspx';
    this.direccion_2 = environment.simepsViejo + '_SIMEPS/MosaicoSectores.aspx';
    this.direccion_3 = 'MosaicoSectores19-24';

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

  cambiosImagen(nombre:string){
    switch (nombre) {
      case 'modulo_1':
        if (this.cambiarImagen_1) {
          this.cambiarImagen_2 = false;
          this.cambiarImagen_3 = false;
          this.cambiarImagen_4 = false;
          this.cambiarImagen_1 = false;
        } else {
          this.cambiarImagen_2 = false;
          this.cambiarImagen_3 = false;
          this.cambiarImagen_4 = false;
          this.cambiarImagen_1 = true;
        }
      break;
      case 'modulo_2':
        if (this.cambiarImagen_2) {
          this.cambiarImagen_1 = false;
          this.cambiarImagen_3 = false;
          this.cambiarImagen_4 = false;
          this.cambiarImagen_2 = false;
        } else {
          this.cambiarImagen_1 = false;	
          this.cambiarImagen_3 = false;
          this.cambiarImagen_4 = false
          this.cambiarImagen_2 = true;
        }
      break;
      case 'modulo_3':
        if (this.cambiarImagen_3) {
          this.cambiarImagen_2 = false;
          this.cambiarImagen_1 = false;
          this.cambiarImagen_4 = false;
          this.cambiarImagen_3 = false;
        } else {
          this.cambiarImagen_2 = false;
          this.cambiarImagen_1 = false;
          this.cambiarImagen_4 = false;
          this.cambiarImagen_3 = true;
        }
      break;
      case 'modulo_4':
        if (this.cambiarImagen_4) {
          this.cambiarImagen_2 = false;
          this.cambiarImagen_3 = false;
          this.cambiarImagen_1 = false;
          this.cambiarImagen_4 = false;
        } else {
          this.cambiarImagen_2 = false;
          this.cambiarImagen_3 = false;
          this.cambiarImagen_1 = false;
          this.cambiarImagen_4 = true;
        }
      break;
    }
  }
}
