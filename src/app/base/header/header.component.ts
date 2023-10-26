import { Component } from '@angular/core';
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

  constructor(private servicio:DataDynamic,private router: Router,private titleService:Title) {
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
}
