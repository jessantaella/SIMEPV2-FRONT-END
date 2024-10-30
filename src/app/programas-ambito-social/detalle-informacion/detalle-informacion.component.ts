import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmbitosocialService } from '../services/ambitosocial.service';

@Component({
  selector: 'app-detalle-informacion',
  templateUrl: './detalle-informacion.component.html',
  styleUrls: ['./detalle-informacion.component.scss']
})
export class DetalleInformacionComponent implements OnInit {

  idIndicador: number = 0;
  informacion: any;
  data:any;
  nombreIndicador:string = '';

  derechosSociales:any;

  metaPlaneada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  metaAlcanzada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  desempenio: { lB: number, uVA: number, meta: number, porcentaje: number } | undefined;
  calidadIndicador: {claridad:boolean,relevancia:boolean,monitoreo:boolean,pertinencia:boolean} | undefined;

  constructor(private ambitosocialService: AmbitosocialService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      let idIndicadorProv = params.get('idIndicador');
      if( idIndicadorProv){
        this.idIndicador = params.get('idIndicador') ? parseInt(params.get('idIndicador')!) : 0;
        this.obtenerInformacionIndicadorDetalle();
        this.obtenerInformacionGrafica();
      }else{
        let idProgramaSect = params.get('idProgramaSect') ? parseInt(params.get('idProgramaSect')!) : 0;
        this.consultaObjetivosSectoriales(idProgramaSect);
      }
    });
  }

  obtenerInformacionIndicadorDetalle() {
    this.ambitosocialService.getinformacionIndicador(this.idIndicador).subscribe(
      res => {
        this.informacion = res?.Data[0];
        console.log('Información del indicador', this.informacion);
        this.metaPlaneada = { vMax: this.informacion?.MAX_META_PLANEADA, vMin: this.informacion?.MIN_META_PLANEADA, vPromedio: this.informacion?.AVG_META_PLANEADA };
        this.metaAlcanzada = {vMax:this.informacion?.MAX_META_ALCANZADA, vMin: this.informacion?.MIN_META_ALCANZADA,vPromedio:this.informacion?.AVG_META_ALCANZADA};
        this.desempenio = {lB:this.informacion?.VALOR_LB, uVA: this.informacion?.META_ALCANZADA,meta:this.informacion?.META, porcentaje:this.informacion?.PORCENTAJE_AVANCE}
        this.calidadIndicador = {claridad:this.informacion?.CLARIDAD,relevancia:this.informacion?.RELEVANCIA,monitoreo:this.informacion?.MONITOREABILIDAD,pertinencia:this.informacion?.PERTINENCIA}
      }
    )
  }

  obtenerInformacionGrafica(){
    this.ambitosocialService.getGraficaIndicadores(this.idIndicador).subscribe(
      res=>{
        this.data = res?.Data;
      }
    )
  }


  consultaObjetivosSectoriales(idProgramaSectorial:number){
    this.ambitosocialService.getObjetivosSectoriales(idProgramaSectorial).subscribe(
      res=>{
        console.log(res);
        let arregloAux = res?.Data;
       if(arregloAux.length>0){
        this.obtenerOpcionesSecundarias(arregloAux[0].ID_PROGRAMA_SEC,arregloAux[0].OBJETIVO,arregloAux[0].NUM_OBJETIVO);
       }
      }
    )
  }

  obtenerOpcionesSecundarias(idProgramaSectorial:number,descObjetivo:string,numObjetivo:number){
    this.ambitosocialService.getOpcionesObjetivosSectoriales(idProgramaSectorial,descObjetivo,numObjetivo).subscribe(
      res=>{
        console.info(res);
        this.nombreIndicador = res?.Data[0]?.INDICADOR      ;
        this.idIndicador = res?.Data[0]?.ID_INDICADOR;
        this.obtenerInformacionIndicadorDetalle();
        this.obtenerInformacionGrafica();
      }
    )
  }


  obtenerDerechoSocialIndicador(){
    this.ambitosocialService.getDerechoSocialIndicador(this.idIndicador).subscribe(
      res=>{
          this.derechosSociales = res?.Data;
      }
    )
  }
  


  



}
