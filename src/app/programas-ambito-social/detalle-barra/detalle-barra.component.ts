import { Component, Input } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-barra',
  templateUrl: './detalle-barra.component.html',
  styleUrls: ['./detalle-barra.component.scss']
})
export class DetalleBarraComponent {

 listaObjetivosSectoriales: any[] = [];
 opcionesSecundarias:{ objetivo: number; info: any }[] = [] ;
  @Input() cargarIndicador!: (id: number) => void;
  idProgramaSect: number | null = null;
 
  constructor(private ambitosocialService:AmbitosocialService,private route: ActivatedRoute,private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.idProgramaSect = params.get('idProgramaSect') ? parseInt(params.get('idProgramaSect')!) : 0;
      console.log('Valor de idProgramaSect:', this.idProgramaSect);
      this.consultaObjetivosSectoriales(this.idProgramaSect);
    });
  }

  /**
 * Trae objetivos sectoriales 
 */
  
consultaObjetivosSectoriales(idProgramaSectorial:number){
  this.ambitosocialService.getObjetivosSectoriales(idProgramaSectorial).subscribe(
    res=>{
      console.log(res);
      this.listaObjetivosSectoriales = res?.Data;
      if(this.listaObjetivosSectoriales.length>0){
        this.obtenerOpcionesSecundarias(this.listaObjetivosSectoriales[0].ID_PROGRAMA_SEC,this.listaObjetivosSectoriales[0].OBJETIVO,this.listaObjetivosSectoriales[0].NUM_OBJETIVO);
      }
    }
  )
}

obtenerOpcionesSecundarias(idProgramaSectorial:number,descObjetivo:string,numObjetivo:number){
  this.ambitosocialService.getOpcionesObjetivosSectoriales(idProgramaSectorial,descObjetivo,numObjetivo).subscribe(
    res=>{
      let existe = this.opcionesSecundarias.some((obj: { objetivo: number; }) => obj.objetivo === numObjetivo);

      if (!existe) {
        this.opcionesSecundarias.push({ objetivo: numObjetivo, info: res?.Data });
      }
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { idIndicador: this.opcionesSecundarias[0].info[0].ID_INDICADOR },
        queryParamsHandling: 'merge' // Esto mantiene los queryParams existentes
      });
    }
  )
}

obtenerInfo(numObjetivo: number): any | undefined {
  let objetivo = this.opcionesSecundarias.find(obj => obj.objetivo === numObjetivo);
  return objetivo ? objetivo.info : undefined;
}


  onClickCard (idIndicador: number) {
    if (this.cargarIndicador) {
      this.cargarIndicador(idIndicador);
    }
  }

}
