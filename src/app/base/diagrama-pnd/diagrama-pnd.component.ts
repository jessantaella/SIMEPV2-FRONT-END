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
  //ocultarSecciones = [false,false,false];

  mostrarPnd=false;
  mostrarFederales=false;
  mostrarRamo=false;


  tamanioSecciones = [
  {height:'60.26',heightOriginal:'234.26'},
  {height:'50.26',heightOriginal:'125'},
  {height:'40.26',heightOriginal:'125'}
  ];

  separadoDiagrama = [
   { pndOriginal:{
      fondo: '378.29',
      texto: '379.75',
      conector:'0'
    },
  pndNuevo:{
    fondo : '210',
    texto : '210',
    conector : '-170' 
  }
  }
  ]

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

  mostrarEvent(tipo:number){
    if(tipo===1){
      this.mostrarPnd = !this.mostrarPnd;
    }
    else if(tipo ===2){
      this.mostrarFederales = !this.mostrarFederales;
    }
    else if(tipo===3){
      this.mostrarRamo = !this.mostrarRamo;
    }
    console.log(this.mostrarPnd);
  }

  obtenerTamanio(tipo:number){
    let salida='100';
    switch( tipo){
      case 1:
        salida =  this.mostrarPnd ? this.tamanioSecciones[0].heightOriginal : this.tamanioSecciones[0].height;
      break;
      case 2:
        salida =  this.mostrarFederales ? this.tamanioSecciones[1].heightOriginal : this.tamanioSecciones[1].height;
      break;
      case 3: 
        salida =  this.mostrarRamo ? this.tamanioSecciones[2].heightOriginal : this.tamanioSecciones[2].height;
       break;
    }
    return salida;
  }

  obtenerPosicion(tipo:number){
    let salida={fondo:'',texto:'',conector:''};
    switch( tipo){
      case 1:
        salida =  !this.mostrarPnd ? this.separadoDiagrama[0].pndNuevo : this.separadoDiagrama[0].pndOriginal;
      break;
    }
    console.log(salida)
    return salida;
  }
}
