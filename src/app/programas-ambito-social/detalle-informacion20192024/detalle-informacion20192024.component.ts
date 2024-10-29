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


  metaPlaneada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  metaAlcanzada: { vMax: number; vMin: number; vPromedio: number; } | undefined;
  desempenio: { lB: number, uVA: number, meta: number, porcentaje: number } | undefined;
  calidadIndicador: {claridad:boolean,relevancia:boolean,monitoreo:boolean,pertinencia:boolean} | undefined;

  constructor(private ambitosocialService: AmbitosocialService, private route: ActivatedRoute,     private cdr: ChangeDetectorRef ) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.idIndicador = params.get('idIndicador') ? parseInt(params.get('idIndicador')!) : 0;
      console.log('Valor de idIndicador:', this.idIndicador);
      this.obtenerInformacionIndicadorDetalle();
    });
  }

  obtenerInformacionIndicadorDetalle() {
    this.ambitosocialService.getinformacionIndicador1924(this.idIndicador).subscribe(
      res => {
        this.informacion = res?.Data[0];
        console.log('Información del indicador', this.informacion);
        this.metaPlaneada = { vMax: this.informacion?.MAX_META_PLANEADA, vMin: this.informacion?.MIN_META_PLANEADA, vPromedio: this.informacion?.AVG_META_PLANEADA };
        console.log("CB" + this.metaPlaneada);
        this.metaAlcanzada = {vMax:this.informacion?.MAX_META_ALCANZADA, vMin: this.informacion?.MIN_META_ALCANZADA,vPromedio:this.informacion?.AVG_META_ALCANZADA};
        this.desempenio = {lB:this.informacion?.VALOR_LB, uVA: this.informacion?.META_ALCANZADA,meta:this.informacion?.META, porcentaje:this.informacion?.PORCENTAJE_AVANCE}
        this.calidadIndicador = {claridad:this.informacion?.CLARIDAD,relevancia:this.informacion?.RELEVANCIA,monitoreo:this.informacion?.MONITOREABILIDAD,pertinencia:this.informacion?.PERTINENCIA}

                // Forzar la detección de cambios
                this.cdr.detectChanges();
      }
    )
  }
}
