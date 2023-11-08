import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { DataDynamic } from '../services/dinamic-data.services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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

  constructor(private servicio: DataDynamic, private router: Router, private titleService: Title, private elementRef: ElementRef) {
    this.consultarData();
    this.href = this.router.url;
    if (this.href === '/') {
      this.rutaActual = this.href;
    }
  }

  // ngOnInit() {
  //   window.addEventListener('beforeunload', (event) => {
  //     // Aquí puedes ejecutar tu función antes de que la página se recargue.
  //     console.log('La página se está recargando. Aquí puedes ejecutar tu función.');
  //     // Para mostrar un mensaje al usuario:
  //     event.returnValue = '¿Estás seguro de que deseas recargar la página?';
  //   });
  // }

  consultarData() {
    this.servicio.getInformacion()
      .pipe(
        tap((res) => {
          this.generales = res.generales;
          this.simeps = res.simeps;
          this.opciones = res.simeps.opciones;
          this.redes = res.generales.redes;
          if (this.href === '/') {
            this.rutaActual = this.href;
            this.cambiarTitulo("Inicio");
          }
        })
      )
      .subscribe({
        next: (result) => {
          // La función "otraFuncion" se llamará después de completar la lógica en "tap".
          this.otraFuncion();
        },
        error: (error) => {
          // Manejo de errores si es necesario.
        },
      });
  }

  cambiarTitulo(nombre: string) {
    this.titleService.setTitle(this.simeps?.sistemaCorto + "-" + nombre);
  }

  cambiarPagina(url: string) {
    this.rutaActual = url;
  }

  cortarNombre(nombreCorto: string) {
    return nombreCorto?.substring(0, 11);
  }

  opcionSeleccionada(ruta: string) {
    return ruta === this.rutaActual;
  }

  otraFuncion() {


    // Espera a que la vista se inicie antes de realizar las operaciones DOM.
    setTimeout(() => {

      this.btn = document.querySelector('.menu-priority');
      this.vlinks = document.querySelector('ul.links');
      this.hlinks = document.querySelector('ul.hidden-links');



      // Obtener el estado inicial
      Array.from(this.vlinks.children).forEach((link: any, index: number) => {
        let width = link.offsetWidth;
        console.log(`${index}: ${width}`)
        this.totalSpace += width;
        this.numOfItems += 1;
        this.breakWidths.push(this.totalSpace);
      });

      console.log("BREAK WIDTHS", this.breakWidths)



      setInterval(() => {
        console.log("SE EJECUTÓ EL INTERVAL")
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
