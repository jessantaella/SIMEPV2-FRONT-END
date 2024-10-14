import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Pnd2013Service } from '../service/pnd2013.service';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pnd2013',
  templateUrl: './pnd2013.component.html',
  styleUrls: ['./pnd2013.component.scss']
})
export class Pnd2013Component implements OnInit{

  metas :any [] = [];
  objetivos: any [] = [];

  metaSeleccionada : number = 0;
  isBrowser = false;
  redes: any;
  alto = 100;
  nombreSistema: any;
  @ViewChild('planeacion')
  planeacion!: ElementRef;

  servidorImg = 'http://devnet.coneval.org.mx:84/_SIMEPS/img/';

constructor( @Inject(PLATFORM_ID) private platformId: any,
 private servicio: DataDynamic,private pndServices: Pnd2013Service){
  this.isBrowser = isPlatformBrowser(this.platformId);
  this.consultarData();
}

  ngOnInit(): void {
    this.obtenerMetas();
    
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setInterval(() => {
        let aux = this.planeacion?.nativeElement.offsetHeight;
        this.alto = aux + aux / 6;
      }, 10);
    }
  }

  consultarData() {
    if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        console.log(res);
        this.nombreSistema = 'Plan Nacional de Desarrollo 2013 - 2018 Metas Nacionales'//res?.simeps?.opciones[1].titulo;
        this.redes = res.generales.redes;
      });
    }
  }

  obtenerMetas(){
    this.pndServices.getConsultaMetasNacionales().subscribe(
      res=>{
        console.log(res);
        this.metas = res?.Data;
      })
  }

  
seleccionarMeta(opcion:number){
  this.metaSeleccionada = opcion;
  this.traerObjetivosxMeta(opcion);
}

traerObjetivosxMeta(id:number){
  this.pndServices.getObjetivosMetasNacionales(id).subscribe(
    res=>{
      console.log(res);
      this.objetivos = res?.Data;
    });
}

}
