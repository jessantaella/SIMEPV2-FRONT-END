import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { AmbitosocialService } from '../services/ambitosocial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDynamic } from 'src/app/base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';

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
  color='';
  loading: boolean = false;

  imgDescarga='';
  isBrowser = false;
  imgCheck='';
  imgWarn='';

  listaProgramasSectoriales: any[] =[];
  loadingProgramasSectoriales = true;
  nombreProgramaSeleccionado: string = '';

  @Output() programaSeleccionado = new EventEmitter<any>();

  constructor(private ambitosocialService: AmbitosocialService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,     private servicio: DataDynamic, private router: Router,    @Inject(PLATFORM_ID) private platformId: any,
  )
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.cargarDiagrama();
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      let idIndicadorProv = params.get('idIndicador');
      if( idIndicadorProv){
        this.idIndicador = params.get('idIndicador') ? parseInt(params.get('idIndicador')!) : 0;
       //this.obtenerInformacionIndicadorDetalle();
       //this.obtenerInformacionGrafica();
       //this.obtenerDerechoSocialIndicador();
       this.cargarDatos();
      }else{
        let idProgramaSect = params.get('idProSectorial') ? parseInt(params.get('idProSectorial')!) : 0;
        this.consultaObjetivosSectoriales(idProgramaSect);
        this.consultaProgramasSectoriales(idProgramaSect);
      }
    });
  }
  cargarDatos() {
    this.loading = true;
    this.obtenerInformacionIndicadorDetalle();
    this.obtenerInformacionGrafica();
    this.obtenerDerechoSocialIndicador();
  }

  obtenerInformacionIndicadorDetalle() {
    this.ambitosocialService.getinformacionIndicador1924(this.idIndicador).subscribe(
      res => {
        this.informacion = res?.Data[0];
        console.log('Información del indicador', this.informacion);
        this.color= this.informacion.PORCENTAJE_COLOR;
        this.metaPlaneada = { vMax: this.informacion?.MAX_META_PLANEADA, vMin: this.informacion?.MIN_META_PLANEADA, vPromedio: this.informacion?.AVG_META_PLANEADA };
        console.log("CB" + this.metaPlaneada);
        this.metaAlcanzada = {vMax:this.informacion?.MAX_META_ALCANZADA, vMin: this.informacion?.MIN_META_ALCANZADA,vPromedio:this.informacion?.AVG_META_ALCANZADA};
        this.desempenio = {lB:this.informacion?.VALOR_LB, uVA: this.informacion?.META_ALCANZADA,meta:this.informacion?.META, porcentaje:this.informacion?.PORCENTAJE_AVANCE}
        this.calidadIndicador = {claridad:this.informacion?.CLARIDAD,relevancia:this.informacion?.RELEVANCIA,monitoreo:this.informacion?.MONITOREABILIDAD,pertinencia:this.informacion?.PERTINENCIA}
        this.adecuacion = this.informacion?.ADECUACION; // Asegúrate de que ADECUACION está en el objeto
        console.log("Adecuación:", this.adecuacion);
        this.loading = false;
      }
    )
  }

  obtenerInformacionGrafica(){
    this.ambitosocialService.getGraficaIndicadores1924(this.idIndicador).subscribe(
      res=>{
        this.data = res?.Data;
        this.loading = false;
      }
    )
  }


  consultaObjetivosSectoriales(idProgramaSectorial:number){
    this.ambitosocialService.getObjetivosSectoriales1924(idProgramaSectorial).subscribe(
      res=>{
        console.log(res);
        let arregloAux = res?.Data;
       if(arregloAux.length>0){
        console.log("ENTROOOOO ")
        this.obtenerOpcionesSecundarias(arregloAux[0].ID_PROGRAMA_SEC,arregloAux[0].OBJETIVO,arregloAux[0].NUM_OBJETIVO);
       }
       this.loading = false;
      }
    )
  }

  obtenerOpcionesSecundarias(idProgramaSectorial:number,descObjetivo:string,numObjetivo:number){
    this.ambitosocialService.getOpcionesObjetivosSectoriales1924(idProgramaSectorial,descObjetivo,numObjetivo).subscribe(
      res=>{
        // Actualiza la URL con el nuevo idIndicador
        this.nombreIndicador = res?.Data[0]?.INDICADOR      ;
        this.idIndicador = res?.Data[0]?.ID_INDICADOR;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { idIndicador: this.idIndicador },
          queryParamsHandling: 'merge' // Merge con otros parámetros existentes
        });
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
            const baseUrl = this.servicio.getInfoImg('');
            this.derechosSociales = res.Data.map((derecho: { DER_DESCRIPCION: string }) => {
              console.log('Derecho:', derecho);
              const descripcion = derecho.DER_DESCRIPCION;
              const imagenUrl = `${baseUrl}LogosSociales/${encodeURIComponent(descripcion)}.jpg`;
              console.log('URL de imagen:', imagenUrl);
              return {
                ...derecho,
                imagenUrl: imagenUrl // asig ulr de la img  construida
              };
            });
          } else {
            this.derechosSociales = [];
          }
          this.loading = false;
        },
        error => {
          console.error("Error al obtener el derecho social", error);
        }
      );
    }


    descargarFichaTecnica(): void {
      const id = this.route.snapshot.queryParamMap.get('idProSectorial')
        ? parseInt(this.route.snapshot.queryParamMap.get('idProSectorial')!, 10)
        : 0;
      const idIndicador = this.idIndicador;

      this.ambitosocialService.descargarFichaTecnica1924(id, idIndicador).subscribe({
        next: blob => {
          const url = window.URL.createObjectURL(blob);

          const nombreSeguro = this.nombreProgramaSeleccionado
            .replace(/[<>:"/\\|?*]/g, '')
            .replace(/\s+/g, '_');

          const link = document.createElement('a');
          link.href = url;
          link.download = `Fichas_Tecnicas_Indicadores_PND4T_Ficha_Tecnica_${nombreSeguro}.xlsx`; // Nombre dinámico
          link.click();

          window.URL.revokeObjectURL(url);
        },
        error: error => {
          console.error('Error al descargar la ficha técnica:', error);
        },
      });
    }





    toggleMostrarMas() {
      this.mostrarMas = !this.mostrarMas; // Cambia el estado de mostrar más
    }

    cargarDiagrama() {
      this.imgDescarga = this.servicio.getImagen('descarga_datos3.jpg');
      this.imgCheck= this.servicio.getImagen('iconoindicador_02.jpg');
      this.imgWarn=this.servicio.getImagen('iconoindicador_01.jpg');
    }


    consultaProgramasSectoriales(idProgramaSect: number): void {
      this.ambitosocialService.getTodosProgramasSectoriales1924().subscribe({
        next: res => {
          // filtor  porID_PROG_SECTORIAL
          const programasSectoriales = res?.Data.filter(
            (programa: { ID_PROG_SECTORIAL: number }) => programa.ID_PROG_SECTORIAL === idProgramaSect
          );
          console.log('Programas sectoriales filtrados:', programasSectoriales);

          // obt pro seleccionado
          const programaSeleccionado = programasSectoriales.length > 0 ? programasSectoriales[0] : null;
          this.programaSeleccionado.emit(programaSeleccionado)
          console.log('Programa seleccionado:', programaSeleccionado);
          this.nombreProgramaSeleccionado = programaSeleccionado?.NOMBRE || 'Nombre_Desconocido';
         // this.listaProgramasSectoriales = programasSectoriales;
          //this.loadingProgramasSectoriales = false;
        },
        error: error => {
          console.error('Error al consultar los programas sectoriales:', error);
        },
      });
    }







}
