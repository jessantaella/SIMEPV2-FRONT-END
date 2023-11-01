import { Component, OnInit, ElementRef  } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { DataDynamic } from '../services/dinamic-data.services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  simeps:any;
  opciones:any;
  redes:any;
  generales:any;
  public href: string = "";
  rutaActual="/";

  constructor(private servicio:DataDynamic,private router: Router,private titleService:Title, private elementRef: ElementRef) {
    this.consultarData();
    this.href = this.router.url;
    if(this.href==='/'){
      this.rutaActual=this.href;
    }
    }

   consultarData(){
    this.servicio.getInformacion().subscribe(
      res=>{
        this.generales=res.generales;
        this.simeps = res.simeps;
        this.opciones = res.simeps.opciones;
        this.redes = res.generales.redes;
        if(this.href==='/'){
          this.rutaActual=this.href;
          console.log(this.simeps.sistemaCorto)
          this.cambiarTitulo("Inicio");
        }
      }
    )
   }

   cambiarTitulo(nombre:string){
    this.titleService.setTitle(this.simeps?.sistemaCorto+"-"+nombre);
   }

   cambiarPagina(url:string){
    this.rutaActual = url;
   }

   cortarNombre(nombreCorto:string){
    return nombreCorto?.substring(0,11);
   }

   opcionSeleccionada(ruta:string){
    return ruta===this.rutaActual;
   }

  //  ngOnInit() {
  //   // Crear una instancia de ResizeObserver
  //   const resizeObserver = new ResizeObserver(entries => {
  //     entries.forEach(entry => {
        
  //       // Manejar el cambio en el tamaño de la pantalla aquí
  //       let btn:any = document.querySelector('.menu-priority');
  //       let vlinks:any = document.querySelector('ul.links');
  //       let hlinks:any = document.querySelector('ul.hidden-links');
      
  //       console.log("btn", btn);
  //       console.log("vlinks", vlinks);
  //       console.log("hlinks", hlinks);
  //       let numOfItems:number = 0;
  //       let totalSpace:number = 0;
  //       let closingTime:number = 1000;
  //       let breakWidths:any = [];
      
  //       // Obtener el estado inicial
  //       Array.from(vlinks.children).forEach( (link:any) => {
  //         var width = link.offsetWidth;
  //         totalSpace += width;
  //         numOfItems += 1;
  //         breakWidths.push(totalSpace);
  //       });
      
  //       let availableSpace:any;
  //       let numOfVisibleItems: any;
  //       let requiredSpace:any;
  //       let timer:any;
      
  //       // Obtener el estado actual
  //       availableSpace = vlinks.offsetWidth - 10;
  //       console.log(`availableSpace: ${availableSpace}`)
  //       numOfVisibleItems = vlinks.children.length;
  //       console.log(`numOfVisibleItems: ${numOfVisibleItems}`)
  //       requiredSpace = breakWidths[numOfVisibleItems - 1];
  //       console.log(`breakWidths:`, breakWidths)
  //         console.log("requiredSpace", requiredSpace);
  //         console.log("availableSpace", availableSpace);
  //       // No hay suficiente espacio
  //       if (requiredSpace > availableSpace) {
  //         hlinks.insertBefore(vlinks.lastElementChild, hlinks.firstChild);
  //         numOfVisibleItems -= 1;
  //       } else if (availableSpace > breakWidths[numOfVisibleItems]) {
  //         vlinks.appendChild(hlinks.firstElementChild);
  //         numOfVisibleItems += 1;
  //       }
    
  //       // Actualizar el botón en consecuencia
  //       // btn.setAttribute("count", numOfItems - numOfVisibleItems);
    
  //       if (numOfVisibleItems === numOfItems) {
  //         btn.classList.add('d-none');
  //       } else {
  //         btn.classList.remove('d-none');
  //       }
  //     });
  //   });

  //   // Observar cambios en el tamaño del elemento raíz del componente
  //   resizeObserver.observe(this.elementRef.nativeElement);
  // }
}
