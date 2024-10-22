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

  metaPlaneada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  metaAlcanzada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  desempenio: { lB: number, uVA: number, meta: number, porcentaje: number } | undefined;
  calidadIndicador: {claridad:boolean,relevancia:boolean,monitoreo:boolean,pertinencia:boolean} | undefined;

  constructor(private ambitosocialService: AmbitosocialService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.idIndicador = params.get('idIndicador') ? parseInt(params.get('idIndicador')!) : 0;
      console.log('Valor de idIndicador:', this.idIndicador);
      this.obtenerInformacionIndicadorDetalle();
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



}
