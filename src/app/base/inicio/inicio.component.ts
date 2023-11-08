import { Component,OnInit } from '@angular/core';
import { ViewportScroller, isPlatformBrowser }
    from '@angular/common';
import { ServicesBaseService } from '../services/services-base.service';
import { DataDynamic } from '../services/dinamic-data.services';
import {getWindow} from "ssr-window";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  nivelSeleccionado:any;
  menuSeleccionado = 1;
  redes:any;
  nombreSistema:any;
  coloresTitulos= ['#21409A','#00A94F','#21409A'];
  auxMascara = false;
  fontSizeTitulo = '24px'
  fontSizeTituloNormal ="20px"

  constructor(private scroller: ViewportScroller,private servicio:DataDynamic,private breakpointObserver: BreakpointObserver) {
        this.consultarData();
        this.breakpointObserver.observe([
          "(max-width: 768px)"
        ]).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.fontSizeTitulo = '14px'
              this.fontSizeTituloNormal = '12px'
          }else{
            this.fontSizeTitulo = '24px'
            this.fontSizeTituloNormal ="20px"
          }
        });
  }

  ngOnInit(): void {
    let pos = this.scroller.getScrollPosition();
    if(pos[1]>0){
      this.scroller.scrollToPosition([0,0])
    }
  }

  consultarData(){
    this.servicio.getInformacion().subscribe(
      res=>{
        this.nombreSistema = res?.simeps?.sistema
        this.redes = res.generales.redes;
      }
    )
   }

  goTo(opcion:number){
    this.menuSeleccionado = opcion;
    switch(opcion){
      case 1:
        this.scroller.scrollToPosition([0,0]);
        break;
      case 2:
        this.scroller.scrollToPosition([0,410]);
        this.auxMascara =true;
        console.log(this.auxMascara)
        break;
      case 3:
        this.scroller.scrollToPosition([0,1100]);
        break;
    }
  }

  regresaEstilosMenu(opcion:number){
    if(opcion === this.menuSeleccionado){
      return {color:this.coloresTitulos[opcion-1],font:this.fontSizeTitulo};
    }else{
      return {color:'black',font:this.fontSizeTituloNormal};
    }

  }

  obtenerPosicion(){
    let pos = this.scroller.getScrollPosition();
    if(pos[1]<400){
      this.menuSeleccionado = 1;
      this.auxMascara = false;
    }else if (pos[1]<1100 && pos[1]>410){
      this.menuSeleccionado = 2;
      this.auxMascara = true;
      console.log(this.auxMascara)
    }else if(pos[1]>900){
      this.menuSeleccionado = 3;
      this.auxMascara = false;
    }    
  }

}
