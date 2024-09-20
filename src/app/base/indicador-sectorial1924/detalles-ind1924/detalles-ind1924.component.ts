import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ObjetivoSectorial } from '../../Models/ObjetivoSectorial';
import { IndicadorSectorial } from '../../Models/IndicadorSectorial';
import { DerechoSocialInd } from '../../Models/DerechoSocialInd';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '../../Models/Meta';
import { DatasetGrafica, GraficaModel } from '../../Models/GraficaModel';
import { ChartDataset } from 'chart.js';


@Component({
  selector: 'app-detalles-ind1924',
  templateUrl: './detalles-ind1924.component.html',
  styleUrls: ['./detalles-ind1924.component.scss']
})
export class DetallesInd1924Component {
  @ViewChild('menuDesplegable') menuDesplegable!: ElementRef;
  idProgramaSector: string | null = null;
  screenWidth: number;
  chartData: GraficaModel = {}
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
            INDICADOR: '1.1 Coeficiente de Autosuficiencia Alimentaria'
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
            INDICADOR: '1.1 Coeficiente de Autosuficiencia Alimentaria'
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
            INDICADOR: '1.1 Coeficiente de Autosuficiencia Alimentaria'
          }
        ],
    }
  ];

  constructor(
    private route: ActivatedRoute,
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

  

  
  
  

}
