import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Pnd2013Service } from '../service/pnd2013.service';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-pnd2013',
  templateUrl: './pnd2013.component.html',
  styleUrls: ['./pnd2013.component.scss']
})
export class Pnd2013Component implements OnInit{

  metas :any [] = [];
  objetivos: any [] = [];
  todoListadoIndicadorObjetivo : any = [];
  listadoIndicadorObjetivo : any = [];

  metaSeleccionada : number = 0;
  isBrowser = false;
  redes: any;
  alto = 100;
  nombreSistema: any;
  @ViewChild('planeacion')
  planeacion!: ElementRef;
  mostrarTransversales:boolean = false;
  expandedRowIndex :number = 0;
  objetivoSeleccionado :any = null;
  nombreObjetivoSeleccionado : string = '' ;
  dataGrafica : any [] = [];

  servidorImg = 'http://devnet.coneval.org.mx:84/_SIMEPS/img/';

  mostrarVistaObjetivo :boolean = false;

constructor( @Inject(PLATFORM_ID) private platformId: any,
 private servicio: DataDynamic,
 private pndServices: Pnd2013Service,
private titleService: Title){
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
        this.titleService.setTitle("SIMEPS | " + 'Plan Nacional de Desarrollo 2013 - 2018 Metas Nacionales');
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
  this.objetivoSeleccionado = null;
  this.nombreObjetivoSeleccionado = '';
  this.mostrarVistaObjetivo = false;
}

traerObjetivosxMeta(id:number){
  this.pndServices.getObjetivosMetasNacionales(id).subscribe(
    res=>{
      console.log(res);
      this.mostrarTransversales = false;
      this.objetivos = res?.Data;
      this.traerTodoslosIndicadoresObjetivo(id);
    });
}

traerTodoslosIndicadoresObjetivo(idMetaNacional:number){
  this.todoListadoIndicadorObjetivo = [];
  this.pndServices.getIndicadoresObjetivoDeMeta(idMetaNacional).subscribe(
    res=>{
      console.log(res);
      this.todoListadoIndicadorObjetivo = res?.Data;
    }
  )
}

traerObjetivosTransversales(){
  this.pndServices.getObjetivosTransversales().subscribe(
    res=>{
      console.log(res);
      this.mostrarTransversales = true;
      this.metaSeleccionada = 0;
      this.objetivos = res?.Data;
    });
}

obtenerIndicadoresObjetivo(ID_OBJETIVO_M:number){
  this.listadoIndicadorObjetivo = [];

  console.log('busca aqui '+ID_OBJETIVO_M,this.todoListadoIndicadorObjetivo)
  this.listadoIndicadorObjetivo = this.todoListadoIndicadorObjetivo.filter((e: { ID_OBJETIVO_M: number; })=>e.ID_OBJETIVO_M === ID_OBJETIVO_M);
      if(this.listadoIndicadorObjetivo.length==0){
        this.listadoIndicadorObjetivo.push({
          NOMBRE:'Sin indicadores asociados'
        })
      }
}

seleccionarVistaObjetivo(indicador:any,objetivo:string){
  this.objetivoSeleccionado = indicador;
  this.nombreObjetivoSeleccionado = objetivo;
  this.obtenerDatosGrafica();
  this.mostrarVistaObjetivo = true;

console.log(indicador)
}

seleccionarVistaObjetivoTransversal(indicador:any){
  this.objetivoSeleccionado = indicador;
  this.nombreObjetivoSeleccionado = '';
  this.obtenerDatosGraficaTransversal();
  this.mostrarVistaObjetivo = true;

console.log(indicador)
}

obtenerDatosGrafica(){
  this.pndServices.obtenerHistoricoIndicadoresObjetivo(this.metaSeleccionada,this.objetivoSeleccionado.ID_OBJETIVO_M,this.objetivoSeleccionado.UNIDAD_MEDIDA,this.objetivoSeleccionado?.NOMBRE).subscribe(
    res=>{
      let datosSalida = res.Data;
      this.dataGrafica  = datosSalida;
      console.log(res);
    }
  )
}

obtenerDatosGraficaTransversal(){
    this.pndServices.obtenerHistoricoIndicadoresTransversal(this.objetivoSeleccionado.NOMBRE).subscribe(
      res=>{
        console.log(res);
        this.dataGrafica = res?.Data;
      }
    )
}

regresar(){
  this.objetivoSeleccionado = null;
  this.nombreObjetivoSeleccionado = '';
  this.mostrarVistaObjetivo = false;
}

}
