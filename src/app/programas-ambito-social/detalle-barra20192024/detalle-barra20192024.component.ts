import { Component, Input } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-barra20192024',
  templateUrl: './detalle-barra20192024.component.html',
  styleUrls: ['./detalle-barra20192024.component.scss']
})
export class DetalleBarra20192024Component {

  listaObjetivosSectoriales: any[] = [];
  opcionesSecundarias:{ objetivo: number; info: any }[] = [] ;
  idPrograma: number | null = null;
  @Input() cargarIndicador!: (id: number) => void;

  totalParametros:number = 0;
  totalObjetivos:number = 0;
  totalMetas:number=0;

  constructor(private ambitosocialService:AmbitosocialService,private route: ActivatedRoute,private router: Router
  ){}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');

    // Suscribirse a los cambios en los query params
    this.route.queryParamMap.subscribe(params => {
      this.idPrograma = params.get('idProSectorial') ? parseInt(params.get('idProSectorial')!) : 0;
      console.log('Valor de idProgramaSect:', this.idPrograma);

      // Llamar a los métodos que dependen de idProgramaSect
      this.consultaObjetivosSectoriales(this.idPrograma);
      this.obtenerEstadisticas(this.idPrograma);
    });
  }



  obtenerEstadisticas(idProgramaSectorial:number){
    this.ambitosocialService.getEstadisticasBasicasDetalleIndicador1924(idProgramaSectorial).subscribe(
      res=>{
        console.log('estadisticas basicas ',res);
        this.totalParametros =res?.Data[0].COUNT_PARAM;
        this.totalObjetivos = res?.Data[0].COUNT_OBJ;
        this.totalMetas = res?.Data[0].COUNT_META;
    })
  }

  consultaObjetivosSectoriales(idProgramaSectorial:number){
    this.ambitosocialService.getObjetivosSectoriales1924(idProgramaSectorial).subscribe(
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
    this.ambitosocialService.getOpcionesObjetivosSectoriales1924(idProgramaSectorial,descObjetivo,numObjetivo).subscribe(
      res=>{
        let existe = this.opcionesSecundarias.some((obj: { objetivo: number; }) => obj.objetivo === numObjetivo);

        if (!existe) {
          this.opcionesSecundarias.push({ objetivo: numObjetivo, info: res?.Data });
        }
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

  seleccionarNuevoIndicador(idIndicador:number){
    this.router.navigate([],{
      relativeTo:this.route,
      queryParams: { idIndicador: idIndicador },
      queryParamsHandling: 'merge' // Esto mantiene los queryParams existentes
    });
  }
}
