import { Component, OnInit, OnDestroy, NgZone, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

interface IndicadorData {
  ABSOLUTA: boolean;
  ANIO: string;
  GRAFICA: string;
  INDICADORCOMPLEMENTARIO: boolean;
  META_ABS_ALCANZADA: number;
  META_ABS_PLANEADA: number | null;
  META_ALCANZADA: string;
  META_PLANEADA: string;
  META_REL_ALCANZADA: number;
  META_REL_PLANEADA: number;
  NO: number;
  RELATIVA: boolean;
}

interface ChartDataItem {
  category: string;
  metaPlaneada: number | null;
  metaAlcanzada: number | null;
  colorPlaneada: string;
  colorAlcanzada: string;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnDestroy, OnChanges{

  private chart: am4charts.XYChart | undefined;

  @Input() data: IndicadorData[] = [];

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].isFirstChange()) {
      this.updateChartData();
    }
  }

  private createChart(): void {
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);

      // Crear el gráfico
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Configurar los ejes
      let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.renderer.minGridDistance = 30;
      valueAxisY.title.text = "";

      let categoryAxisX = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxisX.dataFields.category = "category";
      categoryAxisX.renderer.grid.template.location = 0;
      categoryAxisX.title.text = "";

      // Serie para Meta Planeada
      let seriesPlaneada = chart.series.push(new am4charts.ColumnSeries());
      seriesPlaneada.dataFields.valueY = "metaPlaneada";
      seriesPlaneada.dataFields.categoryX = "category";
      seriesPlaneada.columns.template.tooltipText = "Meta Planeada {category}: [bold]{metaPlaneada}[/]";
      seriesPlaneada.columns.template.fillOpacity = 0.8;

      // Serie para Meta Alcanzada
      let seriesAlcanzada = chart.series.push(new am4charts.ColumnSeries());
      seriesAlcanzada.dataFields.valueY = "metaAlcanzada";
      seriesAlcanzada.dataFields.categoryX = "category";
      seriesAlcanzada.columns.template.tooltipText = "Meta Alcanzada {category}: [bold]{metaAlcanzada}[/]";
      seriesAlcanzada.columns.template.fillOpacity = 0.8;

      chart.logo.disabled = true;

      this.chart = chart;
      this.updateChartData();
    });
  }

  private updateChartData(): void {
    if (this.chart) {
      // Procesa los datos de entrada y extrae la información de GRAFICA
      const chartData = this.data.map(item => {
        const graficaData = JSON.parse(item.GRAFICA);

        return {
          category: graficaData.ciclo,
          metaPlaneada: graficaData.MetaPlaneada ? parseFloat(graficaData.MetaPlaneada) : null,
          metaAlcanzada: graficaData.MetaAlcanzada ? parseFloat(graficaData.MetaAlcanzada) : null,
          colorPlaneada: graficaData.color1,
          colorAlcanzada: graficaData.color2
        } as ChartDataItem;
      });

      // Calcular el valor máximo y mínimo en los datos
      const allValues = chartData.flatMap(item => [item.metaPlaneada, item.metaAlcanzada].filter(value => value !== null)) as number[];
      const maxValue = Math.max(...allValues);
      const minValue = Math.min(...allValues);

      // Redondear los límites a múltiplos de 5
      const adjustedMax = Math.ceil(maxValue / 5) * 5;;
      const adjustedMin = Math.floor(minValue / 5) * 5;

      // Asignar los datos procesados al gráfico
      this.chart.data = chartData;

      // Configurar el rango del eje Y (asegurarse de que es un ValueAxis)
      const valueAxisY = this.chart.yAxes.getIndex(0) as am4charts.ValueAxis;
      if (valueAxisY) {
        valueAxisY.min = adjustedMin;
        valueAxisY.max = adjustedMax;
        valueAxisY.strictMinMax = true;  // Fuerza al eje a respetar min y max
        valueAxisY.renderer.minGridDistance = 50; // Espaciado mínimo entre líneas de cuadrícula
      }

      // Configura los colores de las series basados en colorPlaneada y colorAlcanzada
      const seriesPlaneada = this.chart.series.values[0] as am4charts.ColumnSeries;
      seriesPlaneada.columns.template.adapter.add("fill", (fill, target) => {
        const dataContext = target.dataItem?.dataContext as ChartDataItem;
        return dataContext && dataContext.colorPlaneada ? am4core.color(dataContext.colorPlaneada) : fill;
      });

      const seriesAlcanzada = this.chart.series.values[1] as am4charts.ColumnSeries;
      seriesAlcanzada.columns.template.adapter.add("fill", (fill, target) => {
        const dataContext = target.dataItem?.dataContext as ChartDataItem;
        return dataContext && dataContext.colorAlcanzada ? am4core.color(dataContext.colorAlcanzada) : fill;
      });
    }
  }




  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
