import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ObjetivoSectorial } from '../../Models/ObjetivoSectorial';
import { IndicadorSectorial } from '../../Models/IndicadorSectorial';
import { DerechoSocialInd } from '../../Models/DerechoSocialInd';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '../../Models/Meta';
import { GraficaModel } from '../../Models/GraficaModel';
import { ChartDataset } from 'chart.js';
import { Indicadores1924Service } from '../../services/indicadores1924.service';
import { IndicadorSectorialResponse } from '../../ModelsResponse/IndicadorSectorialResponse';
import { MetaResponse } from '../../ModelsResponse/MetaResponse';


@Component({
  selector: 'app-detalles-ind1924',
  templateUrl: './detalles-ind1924.component.html',
  styleUrls: ['./detalles-ind1924.component.scss']
})
export class DetallesInd1924Component {
  @ViewChild('menuDesplegable') menuDesplegable!: ElementRef;
  idProgramaSector: string | null = null;
  screenWidth: number;
  chartData: GraficaModel = {};
  loadingObjetivosPrograma = false;
  loadingDetallesIndicador = false;
  listaDerechosSocialesAsociados: DerechoSocialInd[] = [
    {
      DER_DESCRIPCION: 'Educación',
      DER_ID: 1
    }
  ]
  listaHistorico: Meta[]=[]
  indicadorSectorial: IndicadorSectorial = {};
  listaObjetivosSectoriales4T: ObjetivoSectorial[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private indicadores1924Service: Indicadores1924Service,
  ) {
    this.screenWidth = window.innerWidth; // Inicializa con el tamaño actual de la pantalla
  }
  
  ngAfterViewInit(): void {
    this.screenWidth = window.innerWidth;
    this.changeCollapseMode(this.screenWidth);
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idProgramaSector = params['idProgramaSect'];
      if(params['idProgramaSect']){
        this.getObjetivosSectoriales(this.idProgramaSector!);
      }
    }); 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = (event.target as Window).innerWidth;
    this.changeCollapseMode(this.screenWidth);
  }
  
  changeCollapseMode(innerWidth: number) {
    if(this.menuDesplegable != null){
      if(innerWidth > 992){
        this.menuDesplegable.nativeElement.classList.add('collapse-horizontal');
      }else{
        this.menuDesplegable.nativeElement.classList.remove('collapse-horizontal');
      }
    }

  }

  cargarGrafica(metas: Meta[]){
    
    const {minValorFinal, maxValorFinal} = this.obtenerMinMax(metas);
    
    const graficaLabels = metas.map(meta =>(meta.CICLO ? meta.CICLO.toString(): ''));

    const lineaBaseDatos = metas.map(meta =>(meta.VALOR == meta.VALORLB ? meta.VALORLB : null));
    const datsetLineaBase = this.construirDataSet('#E0F1DA', lineaBaseDatos, 'Línea Base');
    
    const metaDatos = metas.map(meta =>(meta.MI == meta.META ? meta.META : null));
    const datsetMeta = this.construirDataSet('#a2a2a2',metaDatos,'Meta Planteada');

    const metaAlcanzadaDatos = metas.map(meta =>(meta.VALOR));
    const datsetMetaAlcanzada = this.construirDataSet('#008D6C', metaAlcanzadaDatos,'Meta Alcanzada');

    const metaIntermediaDatos = metas.map(meta =>(meta.MI));
    const datsetMetaIntermedia = this.construirDataSet('#83BA2B', metaIntermediaDatos, 'Meta Intermedia');
    
    this.chartData.TITULO = this.indicadorSectorial.NOMBRE ? this.indicadorSectorial.NOMBRE : '';
    this.chartData.MAX_VALOR = maxValorFinal;
    this.chartData.MIN_VALOR = minValorFinal;
    this.chartData.LABELS = graficaLabels;
    this.chartData.DATASETS = [
      datsetLineaBase,
      datsetMeta,
      datsetMetaAlcanzada,
      datsetMetaIntermedia
    ];

  }

  obtenerMinMax(metas: Meta[]) {
    const minValor = Math.min(...metas.map(meta => (meta.MI !== null ? meta.MI! : Infinity)), ...metas.map(meta => (meta.VALOR !== null ? meta.VALOR! : Infinity)));
    const minValorFinal = minValor;
    
    const maxValor = Math.max(...metas.map(meta => (meta.MI !== null ? meta.MI! : -Infinity)), ...metas.map(meta => (meta.VALOR !== null ? meta.VALOR! : -Infinity)));
    const maxValorFinal = maxValor;
    return {minValorFinal, maxValorFinal};
  }

  construirDataSet (color: string, data: (number | null)[], titulo: string){
    const dataset: ChartDataset<'line', (number | null)[]> = {
      backgroundColor: color,
      borderColor: color,
      data: data,
      label: titulo,
      pointRadius: 4,
    }
    return dataset
  }

  async getObjetivosSectoriales(idPrograma: string) {
    this.loadingObjetivosPrograma = true;
  
    try {
      const res = await this.indicadores1924Service.getObjetivosSectoriales4T(idPrograma).toPromise();
      
      const objetivos = await Promise.all((res as ObjetivoSectorial[]).map(async (objetivo) => {
        const listaIndicadores = await this.getIndicadoresSectoriales(objetivo.ID_PROGRAMA_SEC, 2, objetivo.OBJETIVO, objetivo.NUM_OBJETIVO);
        return this.respuestaAObjetivoSectorial(objetivo, listaIndicadores);
      }));

      if(objetivos.length > 0 && objetivos[0].INDICADORES_SECTORIALES && objetivos[0].INDICADORES_SECTORIALES?.length > 0){
        await this.cargarIndicador(objetivos[0].INDICADORES_SECTORIALES[0].ID_INDICADOR!);
      }
  
      this.listaObjetivosSectoriales4T = objetivos;

      setTimeout(() => {
        this.loadingObjetivosPrograma = false;
      }, 200);
  
    } catch (err) {
      console.error("Error al obtener los objetivos sectoriales:", err);
      this.loadingObjetivosPrograma = false;
    }
  }

  respuestaAObjetivoSectorial(objetivo: ObjetivoSectorial, listaIndicadores: IndicadorSectorial[]){
    let objetivoSectorial =new ObjetivoSectorial();
    objetivoSectorial.ID_PROGRAMA_SEC = objetivo.ID_PROGRAMA_SEC;
    objetivoSectorial.NUM_OBJETIVO = objetivo.NUM_OBJETIVO;
    objetivoSectorial.OBJETIVO = objetivo.OBJETIVO;
    objetivoSectorial.INDICADORES_SECTORIALES = listaIndicadores;
    return objetivoSectorial;
  }


  async getIndicadoresSectoriales(idProgramaSectorial: number, opcion: number, descObjetivo: string, numObjetivo: number): Promise<IndicadorSectorial[]> {
    try {
      const res = await this.indicadores1924Service.getIndicadorObjetivos4T(idProgramaSectorial, opcion, descObjetivo).toPromise();
      const response = (res as IndicadorSectorial[]).map(indicador => 
        this.respuestaAIndicadorSectorial(indicador, numObjetivo)
      );
      return response;
    } catch (err) {
      console.error("Error al obtener los detalles del indicador:", err);
      return []; 
    }
  }

  respuestaAIndicadorSectorial(indicador: IndicadorSectorial, numObjetivo: number){
    let indicadorSectorial =new IndicadorSectorial();
    indicadorSectorial.ID_INDICADOR = indicador.ID_INDICADOR;
    indicadorSectorial.INDICADOR = indicador.INDICADOR;
    indicadorSectorial.NUM_INDICADOR = indicador.NUM_INDICADOR;
    indicadorSectorial.TIPO = indicador.TIPO;
    indicadorSectorial.NUM_OBJETIVO = numObjetivo;
    return indicadorSectorial;
  }

  async getDetallesIndicadorSectorial(idIndicador: number,): Promise<IndicadorSectorial> {
    try {
      const res = await this.indicadores1924Service.getDetallesIndicador4T(idIndicador, 1).toPromise();
      const response = this.respuestaADetalleIndicadorSectorial(res[0]);
      return response;
    } catch (err) {
      console.error("Error al obtener los detalles del indicador:", err);
      return new IndicadorSectorial(); 
    }
  }
  
  respuestaADetalleIndicadorSectorial(indicador: IndicadorSectorialResponse){
    let indicadorSectorial = new IndicadorSectorial();

    indicadorSectorial.ACUM_PER = indicador.ACUM_PER;
    indicadorSectorial.ADECUACION = indicador.ADECUACION;
    indicadorSectorial.AVG_META_ALCANZADA = indicador.AVG_META_ALCANZADA;
    indicadorSectorial.AVG_META_PLANEADA = indicador.AVG_META_PLANEADA;
    indicadorSectorial.CICLO = indicador.CICLO;
    indicadorSectorial.CLARIDAD = indicador.CLARIDAD;
    indicadorSectorial.DESCRIPCION = indicador.DEFINICION_META;
    indicadorSectorial.OBJETIVO = indicador.DESCRIPCION_OBJETIVO;
    indicadorSectorial.DOF_LB_DESCRIPCION = indicador.DOF_DESCRIPCION_LB;
    indicadorSectorial.DOF_META_DESCRIPCION = indicador.DOF_DESCRIPCION_META;
    indicadorSectorial.ENFOQUE_INDICADOR = indicador.ENFOQUE_INDICADOR;
    indicadorSectorial.ENFOQUE_RES = indicador.ENFOQUE_RES;
    indicadorSectorial.FUENTE = indicador.FUENTE_INFORMACION;
    indicadorSectorial.LB_COLOR = indicador.LB_COLOR;
    indicadorSectorial.MALCANZADA_COLOR = indicador.MALCANZADA_COLOR
    indicadorSectorial.MAX_META_ALCANZADA = indicador.MAX_META_ALCANZADA;
    indicadorSectorial.MAX_META_PLANEADA = indicador.MAX_META_PLANEADA;
    indicadorSectorial.META = indicador.META;
    indicadorSectorial.META_ALCANZADA = indicador.META_ALCANZADA;
    indicadorSectorial.META_COLOR = indicador.META_COLOR;
    indicadorSectorial.METODO = indicador.METODO_CALCULO;
    indicadorSectorial.MIN_META_ALCANZADA = indicador.MIN_META_ALCANZADA;
    indicadorSectorial.MIN_META_PLANEADA = indicador.MIN_META_PLANEADA;
    indicadorSectorial.MONITOREABILIDAD = indicador.MONITOREABILIDAD;
    indicadorSectorial.NIVEL_DESAGREGACION = indicador.NIVEL_DESAGREGACION;
    indicadorSectorial.NOMBRE = indicador.NOMBRE_META;
    indicadorSectorial.PERIODICIDAD = indicador.PERIODICIDAD;
    indicadorSectorial.PERTINENCIA = indicador.PERTINENCIA;
    indicadorSectorial.PORCENTAJE_AVANCE = indicador.PORCENTAJE_AVANCE;
    indicadorSectorial.PORCENTAJE_COLOR = indicador.PORCENTAJE_COLOR;
    indicadorSectorial.Nombre_Ramo = indicador.RAMO;
    indicadorSectorial.RELEVANCIA = indicador.RELEVANCIA;
    indicadorSectorial.TENDENCIA = indicador.TENDENCIA;
    indicadorSectorial.TIPO = indicador.TIPO;
    indicadorSectorial.UDM = indicador.UDM;
    indicadorSectorial.VALOR_LB = indicador.VALOR_LB;
    
    indicadorSectorial.CAMBIO_TEXTO = indicador.CAMBIO_TEXTO;
    
    indicadorSectorial.TIPO_INDICADOR_GRAFICA = indicador.TIPO_INDICADOR_GRAFICA;

    if (indicador.META == 0 || indicador.META == null)
    {
        indicadorSectorial.METATEXT = "ND";
    }
    else
    {
        indicadorSectorial.METATEXT = indicador.META.toString();
    }

    return indicadorSectorial;
  }

  async cargarIndicador(idIndicador: number){
    this.loadingDetallesIndicador = true;
    let indicador = await this.getDetallesIndicadorSectorial(idIndicador);
    this.indicadorSectorial = indicador;
    let metas = await this.getHistorialIndicadores(idIndicador);
    this.cargarGrafica(metas);
    setTimeout(() =>{
      this.loadingDetallesIndicador = false;
    }, 200);
  }

  async getHistorialIndicadores(idIndicador: number,): Promise<Meta[]> {
    try {
      const res = await this.indicadores1924Service.getDetallesIndicador4T(idIndicador, 2).toPromise();
      const response = (res as MetaResponse[]).map(meta => 
        this.respuestaAMetas(meta)
      );
      return response;
    } catch (err) {
      console.error("Error al obtener el historico del indicador:", err);
      return []; 
    }
  }

  respuestaAMetas(metaResponse: MetaResponse){
    let meta =new Meta();
    meta.CICLO = metaResponse.CICLO;
    meta.META = metaResponse.META;
    meta.METASHISTORICO = metaResponse.METAS_HISTORICO;
    meta.MI = metaResponse.MI;
    meta.VALOR = metaResponse.VALOR;
    meta.VALORLB = metaResponse.VALOR_LB;
    return meta;
  }
  

  
  
  

}
