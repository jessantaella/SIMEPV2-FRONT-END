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

@Component({
  selector: 'app-line-chart-indicador',
  templateUrl: './line-chart-indicador.component.html',
  styleUrls: ['./line-chart-indicador.component.scss']
})
export class LineChartIndicadorComponent implements OnInit, OnDestroy, OnChanges{

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
      let chart = am4core.create("chartdivLine", am4charts.XYChart);
         // Deshabilitar el logo de amCharts
    chart.logo.disabled = true;

      // Configurar los ejes
      let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = ""; // Ocultar el título del eje Y
      valueAxisY.renderer.minGridDistance = 30;

      let categoryAxisX = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxisX.dataFields.category = "category";
      categoryAxisX.title.text = ""; // Ocultar el título del eje X
      categoryAxisX.renderer.grid.template.location = 0;

      // Serie de puntos para Meta Planeada
      let seriesPlaneada = chart.series.push(new am4charts.LineSeries());
      seriesPlaneada.dataFields.valueY = "metaPlaneada";
      seriesPlaneada.dataFields.categoryX = "category";
      seriesPlaneada.strokeWidth = 2;
      seriesPlaneada.tooltipText = "Meta Planeada {category}: [bold]{metaPlaneada}[/]";
      seriesPlaneada.stroke = am4core.color("#7E015B"); // Color para Meta Planeada
      seriesPlaneada.name = "Meta Planeada";

      // Agregar puntos (bullets) a Meta Planeada
      let bulletPlaneada = seriesPlaneada.bullets.push(new am4charts.CircleBullet());
      bulletPlaneada.circle.radius = 5;
      bulletPlaneada.circle.fill = am4core.color("#7E015B");

      // Serie de puntos para Meta Alcanzada
      let seriesAlcanzada = chart.series.push(new am4charts.LineSeries());
      seriesAlcanzada.dataFields.valueY = "metaAlcanzada";
      seriesAlcanzada.dataFields.categoryX = "category";
      seriesAlcanzada.strokeWidth = 2;
      seriesAlcanzada.tooltipText = "Meta Alcanzada {category}: [bold]{metaAlcanzada}[/]";
      seriesAlcanzada.stroke = am4core.color("#3C1559"); // Color para Meta Alcanzada
      seriesAlcanzada.name = "Meta Alcanzada";

      // Agregar puntos (bullets) a Meta Alcanzada
      let bulletAlcanzada = seriesAlcanzada.bullets.push(new am4charts.CircleBullet());
      bulletAlcanzada.circle.radius = 5;
      bulletAlcanzada.circle.fill = am4core.color("#3C1559");

      // Añadir leyenda
      chart.legend = new am4charts.Legend();

      this.chart = chart;
      this.updateChartData();
    });
  }

  private updateChartData(): void {
    if (this.chart) {
      // Procesa los datos de entrada y extrae la información de GRAFICA
      this.chart.data = this.data.map(item => {
        const graficaData = JSON.parse(item.GRAFICA);

        return {
          category: graficaData.ciclo,
          metaPlaneada: graficaData.MetaPlaneada ? parseFloat(graficaData.MetaPlaneada) : null,
          metaAlcanzada: graficaData.MetaAlcanzada ? parseFloat(graficaData.MetaAlcanzada) : null,
          colorPlaneada: graficaData.color1,
          colorAlcanzada: graficaData.color2
        };
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  }
