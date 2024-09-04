import { DOCUMENT, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DataDynamic } from '../services/dinamic-data.services';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { WINDOW } from '../services/window.service';
import { environment } from 'src/environments/environment';

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
  programasSectoriales = [
    { value: 'Desarrollo Agropecuario', label: 'Desarrollo Agropecuario' },
    { value: 'Desarrollo Económico', label: 'Desarrollo Económico' },
    { value: 'Desarrollo Social', label: 'Desarrollo Social' },
    { value: 'Desarrollo Urbano', label: 'Desarrollo Urbano' },
    { value: 'Educación', label: 'Educación' },
    { value: 'Igualdad de Género', label: 'Igualdad de Género' },
  ];
  images: string[] = [
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
    '../../../assets/img/NUBE.svg',
  ];
  currentIndex: number = 0;
  imageWidth: number = 160;

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
  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        console.log(res);
        this.nombreSistema = res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
    }
  }

  next() {
    if (this.currentIndex < this.images.length - this.visibleImageCount()) {
      this.currentIndex++;
      this.updateTransform();
    }
  }

  private updateTransform() {
    const ul = document.querySelector('.carousel ul') as HTMLElement;
    ul.style.transform = `translateX(-${this.currentIndex * this.imageWidth}px)`;
  }

  private visibleImageCount(): number {
    const carouselWidth = document.querySelector('.carousel')?.clientWidth || 0;
    return Math.floor(carouselWidth / (this.imageWidth + 10));
  }
  
}
