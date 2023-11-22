import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { DataDynamic } from '../services/dinamic-data.services';
import { tap } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  simeps: any;
  opciones: any;
  redes: any;
  generales: any;
  public href: string = "";
  rutaActual = "/";
  btn: any;
  vlinks: any;
  hlinks: any;
  numOfItems: number = 0;
  totalSpace: number = 0;
  closingTime: number = 1000;
  breakWidths: any = [];
  minWrap=0;
  currentRoute:any;

  isBrowser = false;


  constructor(private servicio: DataDynamic, private router: Router, private titleService: Title,@Inject(DOCUMENT) private document: Document,@Inject(PLATFORM_ID) private platformId:any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.consultarData();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
      }
    });

  }

  consultarData() {
    this.servicio.getInformacion()
      .pipe(
        tap((res) => {
          this.generales = res.generales;
          this.simeps = res.simeps;
          this.opciones = res.simeps.opciones;
          this.redes = res.generales.redes;
          this.cambiarPagina()
        })
      )
      .subscribe({
        next: (result) => {
          // La función "otraFuncion" se llamará después de completar la lógica en "tap".
          if (this.isBrowser) {
         this.otraFuncion(); 
          }
         
        },
        error: (error) => {
          // Manejo de errores si es necesario.
        },
      });
  }

  cambiarTitulo(nombre: string) {
    this.titleService.setTitle(this.simeps?.sistemaCorto + "-" + nombre);
  }

  cambiarPagina() {
    this.opciones.forEach((opc:any)=>{
      if(opc.url === this.currentRoute){
        this.cambiarTitulo(opc.nombre);
      }
    });

  }

  cortarNombre(nombreCorto: string) {
    return nombreCorto?.substring(0, 11);
  }

  opcionSeleccionada(ruta: string) {
    return ruta === this.currentRoute || (ruta === "/inicio" && this.currentRoute === "/");
  }

  otraFuncion() {


    // Espera a que la vista se inicie antes de realizar las operaciones DOM.
    setTimeout(() => {
      

      this.btn =  this.document.querySelector('.menu-priority');
      this.vlinks = this.document.querySelector('ul.links');
      this.hlinks = this.document.querySelector('ul.hidden-links');



      // Obtener el estado inicial
      Array.from(this.vlinks.children).forEach((link: any, index: number) => {
        let width = link.offsetWidth;
        this.totalSpace += width;
        this.numOfItems += 1;
        this.breakWidths.push(this.totalSpace);
      });

      setInterval(() => {
        let availableSpace: any;
        let numOfVisibleItems: any;
        let requiredSpace: any;
        // Obtener el estado actual
        availableSpace = this.vlinks.offsetWidth - 10;
        numOfVisibleItems = this.vlinks.children.length;
        requiredSpace = this.breakWidths[numOfVisibleItems - 1];

        // No hay suficiente espacio
        if (requiredSpace > availableSpace) {
          this.hlinks.insertBefore(this.vlinks.lastElementChild, this.hlinks.firstChild);
          numOfVisibleItems -= 1;
        } else if (availableSpace > this.breakWidths[numOfVisibleItems]) {
          this.vlinks.appendChild(this.hlinks.firstElementChild);
          numOfVisibleItems += 1;
        }

        // Actualizar el botón en consecuencia
        this.btn.setAttribute('count', this.numOfItems - numOfVisibleItems);

        if (numOfVisibleItems === this.numOfItems) {
          this.btn.classList.add('d-none');
        } else {
          this.btn.classList.remove('d-none');
        }

      }, 10)
    }, 1_000);
  }

  

}
