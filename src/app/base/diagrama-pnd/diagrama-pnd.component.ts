import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ServicesBaseService } from '../services/services-base.service';

@Component({
  selector: 'app-diagrama-pnd',
  templateUrl: './diagrama-pnd.component.html',
  styleUrls: ['./diagrama-pnd.component.scss']
})
export class DiagramaPndComponent {

  altura : any;
  anchura : any;
  pruebaColor = '#2AB90A';
  coloresPND = { fondoGral: '#4caf62', fondoTitulo: '#398249', fondoContenido: '#52548c' };
  coloresDesarrolloSocial = { fondoGral: '#8285e0', fondoTitulo: '#53558f', fondoContenido: '#52548c' };
  coloresRamo33 = { fondoGral: '#17b0ba', fondoTitulo: '#1c6173', fondoContenido: '#0f747a' };
  nivelSeleccionado = null;
  mostrarMascara:boolean = false;
  timeLeft: number = 5;
  interval:any;
  mostrarMovil:boolean = false;
  //nd:true,desarrollo:true,fondos:true
  ocultarSecciones = [false,false,false];


  public innerWidth: any;
  constructor( private breakpointObserver: BreakpointObserver,private base:ServicesBaseService) {
    this.breakpointObserver.observe([
      "(max-width: 768px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
          console.log("aqui es movil");
          this.mostrarMovil = true;     
      } else {
          this.mostrarMovil = false;   
      }
    });
  }

  ngOnInit(): void {  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.mostrarMascara = false;
        clearInterval(this.interval);
        this.timeLeft = 5;
      }
    },1000)
  }

  mascara(){
    this.mostrarMascara = true;
    this.startTimer();
  }

  eventoPND(){
    console.log("PND"); 
  }
  eventoAcciones(){
    console.log("Acciones"); 
  }
  eventoRamo(){
    console.log("rAMO"); 
  }

  mostrarSeccion(opcion:number){
    this.ocultarSecciones[opcion]=!this.ocultarSecciones[opcion];
  }
}
