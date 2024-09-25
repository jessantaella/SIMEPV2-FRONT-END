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
  loadingDetallesIndicador = false;
  listaDerechosSocialesAsociados: DerechoSocialInd[] = [
    {
      DER_DESCRIPCION: 'Educación',
      DER_ID: 1
    }
  ]
  listaHistorico: Meta[]=[
    {
      CICLO: 2013,
      MI: null,
      VALOR: 81.50,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2013","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"81.50"}'
    },
    {
      CICLO: 2014,
      MI: null,
      VALOR: 80.30,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2014","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"80.30"}'
    },
    {
      CICLO: 2015,
      MI: null,
      VALOR: 79.00,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2015","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"79.00"}'
    },
    {
      CICLO: 2016,
      MI: null,
      VALOR: 78.30,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2016","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"78.30"}'
    },
    {
      CICLO: 2017,
      MI: null,
      VALOR: 76.90,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2017","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"76.90"}'
    },
    {
      CICLO: 2018,
      MI: null,
      VALOR: 75.00,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2018","DOF_META":"1","DOF_LB":"1","LineaBase":"75.00","MetaAlcanzada":"75.00"}'
    },
    {
      CICLO: 2019,
      MI: null,
      VALOR: 73.70,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2019","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"73.70"}'
    },
    {
      CICLO: 2020,
      MI: 76.70,
      VALOR: 73.50,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2020","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"73.50","MetaIntermedia":"76.70"}'
    },
    {
      CICLO: 2021,
      MI: 77.50,
      VALOR: 70.80,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2021","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"70.80","MetaIntermedia":"77.50"}'
    },
    {
      CICLO: 2022,
      MI: 78.30,
      VALOR: 69.50,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2022","DOF_META":"1","DOF_LB":"1","MetaAlcanzada":"69.50","MetaIntermedia":"78.30"}'
    },
    {
      CICLO: 2023,
      MI: 79.20,
      VALOR: null,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2023","DOF_META":"1","DOF_LB":"1","MetaIntermedia":"79.20"}'
    },
    {
      CICLO: 2024,
      MI: 80.00,
      VALOR: null,
      VALORLB: 75.00,
      META: 80.00,
      METASHISTORICO: '{"CICLO":"2024","DOF_META":"1","DOF_LB":"1","MetaIntermedia":"80.00","Meta2018":"80.00"}'
    }
  ]
  indicadorSectorial: IndicadorSectorial = new IndicadorSectorial();
  listaObjetivosSectoriales4T: ObjetivoSectorial[] = [
    {
        NUM_OBJETIVO: 1,
        OBJETIVO: "Mejorar la educación",
        ID_INDICADOR: "EDU123",
        ID_PROGRAMA_SEC: 101,
        TIPO_INDICADOR: "Cualitativo",
        INDICADORES_SECTORIALES: [
          {
            TIPO_INDICADOR: 'M',
            INDICADOR: '1.1 Coeficiente de Autosuficiencia Alimentaria',
            ID_INDICADOR: 12
          }
        ],
    },
    {
        NUM_OBJETIVO: 2,
        OBJETIVO: "Incrementar el acceso a la salud",
        ID_INDICADOR: "SAL456",
        ID_PROGRAMA_SEC: 102,
        TIPO_INDICADOR: "Cuantitativo",
        INDICADORES_SECTORIALES: [
          {
            TIPO_INDICADOR: 'M',
            INDICADOR: '1.1 Coeficiente de Autosuficiencia Alimentaria',
            ID_INDICADOR: 22,
          }
        ],
    },
    {
        NUM_OBJETIVO: 3,
        OBJETIVO: "Fomentar la cultura",
        ID_INDICADOR: "CUL789",
        ID_PROGRAMA_SEC: 103,
        TIPO_INDICADOR: "Cualitativo",
        INDICADORES_SECTORIALES: [
          {
            TIPO_INDICADOR: 'M',
            INDICADOR: '1.1 Coeficiente de Autosuficiencia Alimentaria',
            ID_INDICADOR: 43,
          }
        ],
    }
  ];

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
      this.getObjetivosSectoriales(this.idProgramaSector!);
    }); 
    this.formatearChartData(this.listaHistorico)
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

  cargarIndicador(idIndicador: number){
    console.log({idIndicador});
  }

  formatearChartData(metas: Meta[]){
    
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
    const minValorFinal = minValor % 5 != 0 ? minValor - (minValor % 5) : minValor;
    
    const maxValor = Math.max(...metas.map(meta => (meta.MI !== null ? meta.MI! : -Infinity)), ...metas.map(meta => (meta.VALOR !== null ? meta.VALOR! : -Infinity)));
    const maxValorFinal = maxValor % 5 != 0 ? maxValor - (maxValor % 5) + 5 : maxValor;
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
    this.loadingDetallesIndicador = true;
  
    try {
      const res = await this.indicadores1924Service.getObjetivosSectoriales4T(idPrograma).toPromise();
      
      const objetivos = await Promise.all((res as ObjetivoSectorial[]).map(async (objetivo) => {
        const listaIndicadores = await this.getIndicadoresSectoriales(objetivo.ID_PROGRAMA_SEC, 2, objetivo.OBJETIVO, objetivo.NUM_OBJETIVO);
        return this.respuestaAObjetivoSectorial(objetivo, listaIndicadores);
      }));

      if(objetivos.length > 0 && objetivos[0].INDICADORES_SECTORIALES && objetivos[0].INDICADORES_SECTORIALES?.length > 0){
        console.log({id: objetivos[0].INDICADORES_SECTORIALES[0].ID_INDICADOR!})
        const primerIndicador = await this.getDetallesIndicadorSectorial(objetivos[0].INDICADORES_SECTORIALES[0].ID_INDICADOR!);
        this.indicadorSectorial = primerIndicador;
      }
  
      this.listaObjetivosSectoriales4T = objetivos;

      setTimeout(() => {
        this.loadingDetallesIndicador = false;
      }, 500);
  
    } catch (err) {
      console.error("Error al obtener los objetivos sectoriales:", err);
      this.loadingDetallesIndicador = false;
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
      return []; // Retorna un arreglo vacío en caso de error
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
      console.log({res});
      const response = this.respuestaADetalleIndicadorSectorial(res[0]);
      return response;
    } catch (err) {
      console.error("Error al obtener los detalles del indicador:", err);
      return new IndicadorSectorial(); // Retorna un arreglo vacío en caso de error
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
  

  
  
  

}
