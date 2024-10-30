import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-informacion20192024',
  templateUrl: './detalle-informacion20192024.component.html',
  styleUrls: ['./detalle-informacion20192024.component.scss']
})
export class DetalleInformacion20192024Component implements OnInit{

  informacion: any;
  idIndicador: number = 0;

  data:any;
  nombreIndicador:string = '';

  //derechosSociales:any;
  derechosSociales: any[] | null = null;

  mostrarMas: boolean = false;

  metaPlaneada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  metaAlcanzada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  desempenio: { lB: number, uVA: number, meta: number, porcentaje: number } | undefined;
  calidadIndicador: {claridad:boolean,relevancia:boolean,monitoreo:boolean,pertinencia:boolean} | undefined;
  adecuacion:boolean | undefined;

  constructor(private ambitosocialService: AmbitosocialService, private route: ActivatedRoute,     private cdr: ChangeDetectorRef ) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      let idIndicadorProv = params.get('idIndicador');
      if( idIndicadorProv){
        this.idIndicador = params.get('idIndicador') ? parseInt(params.get('idIndicador')!) : 0;
        this.obtenerInformacionIndicadorDetalle();
       this.obtenerInformacionGrafica();
       this.obtenerDerechoSocialIndicador(); // Llama al método aquí
      }else{
        let idProgramaSect = params.get('idProSectorial') ? parseInt(params.get('idProSectorial')!) : 0;
        this.consultaObjetivosSectoriales(idProgramaSect);
      }
    });
  }
  obtenerInformacionIndicadorDetalle() {
    console.log(this.idIndicador);
    this.ambitosocialService.getinformacionIndicador1924(this.idIndicador).subscribe(
      res => {
        this.informacion = res?.Data[0];
        console.log('Información del indicador', this.informacion);
        this.metaPlaneada = { vMax: this.informacion?.MAX_META_PLANEADA, vMin: this.informacion?.MIN_META_PLANEADA, vPromedio: this.informacion?.AVG_META_PLANEADA };
        console.log("CB" + this.metaPlaneada);
        this.metaAlcanzada = {vMax:this.informacion?.MAX_META_ALCANZADA, vMin: this.informacion?.MIN_META_ALCANZADA,vPromedio:this.informacion?.AVG_META_ALCANZADA};
        this.desempenio = {lB:this.informacion?.VALOR_LB, uVA: this.informacion?.META_ALCANZADA,meta:this.informacion?.META, porcentaje:this.informacion?.PORCENTAJE_AVANCE}
        this.calidadIndicador = {claridad:this.informacion?.CLARIDAD,relevancia:this.informacion?.RELEVANCIA,monitoreo:this.informacion?.MONITOREABILIDAD,pertinencia:this.informacion?.PERTINENCIA}
        this.adecuacion = this.informacion?.ADECUACION; // Asegúrate de que ADECUACION está en el objeto
        console.log("Adecuación:", this.adecuacion);
      }
    )
  }

  obtenerInformacionGrafica(){
    this.ambitosocialService.getGraficaIndicadores1924(this.idIndicador).subscribe(
      res=>{
        this.data = res?.Data;
      }
    )
  }


  consultaObjetivosSectoriales(idProgramaSectorial:number){
    this.ambitosocialService.getObjetivosSectoriales1924(idProgramaSectorial).subscribe(
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
    this.ambitosocialService.getOpcionesObjetivosSectoriales1924(idProgramaSectorial,descObjetivo,numObjetivo).subscribe(
      res=>{
        console.info(res);
        this.nombreIndicador = res?.Data[0]?.INDICADOR      ;
        this.idIndicador = res?.Data[0]?.ID_INDICADOR;
        this.obtenerInformacionIndicadorDetalle();
        this.obtenerInformacionGrafica();
      }
    )
  }


  /*obtenerDerechoSocialIndicador(){
    console.log(this.idIndicador);
    this.ambitosocialService.getDerechoSocialIndicador1924(this.idIndicador).subscribe(
      res=>{
          this.derechosSociales = res?.Data;
      }
    )
  }*/

    obtenerDerechoSocialIndicador() {
      this.ambitosocialService.getDerechoSocialIndicador1924(this.idIndicador).subscribe(
        res => {
          if (res?.Data && res.Data.length > 0) {
            this.derechosSociales = res.Data; // Asigna todos los derechos sociales
          } else {
            this.derechosSociales = null; // No hay datos
          }
        },
        error => {
          console.error("Error al obtener el derecho social", error);
        }
      );
    }

    toggleMostrarMas() {
      this.mostrarMas = !this.mostrarMas; // Cambia el estado de mostrar más
    }

}
