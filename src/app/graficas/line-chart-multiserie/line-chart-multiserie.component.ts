import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';


@Component({
  selector: 'app-line-chart-multiserie',
  templateUrl: './line-chart-multiserie.component.html',
  styleUrls: ['./line-chart-multiserie.component.scss']
})
export class LineChartMultiserieComponent implements OnInit, OnDestroy {


  @Input() data: { Ciclo: number, MI: number | null ,VALOR:number | null ,VALORLB : number | null, META :number | null, METASHISTORICO:string }[] = [];


  private chart: am4charts.XYChart | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // Verificar si el valor de 'data' ha cambiado
    if (changes['data'] && changes['data'].currentValue) {
      // Llamar a createChart con los nuevos datos
      this.chart?.dispose();
      this.createChart(changes['data'].currentValue);
    }
  }


  createChart(data: { METASHISTORICO: string }[]) {
    let chart = am4core.create('chartdiv', am4charts.XYChart);

    // Procesar solo los datos dentro de METASHISTORICO
    chart.data = data.map(item => {
      let metaHistorico;
      try {
        metaHistorico = JSON.parse(item.METASHISTORICO);
      } catch (e) {
        console.error('Error parsing METASHISTORICO:', e);
        metaHistorico = {};
      }

      return {
        date: metaHistorico?.CICLO ? metaHistorico.CICLO.toString() : "N/A",
        MetaAlcanzada: metaHistorico?.MetaAlcanzada ? parseFloat(metaHistorico.MetaAlcanzada) : undefined,
        MetaIntermedia: metaHistorico?.MetaIntermedia ? parseFloat(metaHistorico.MetaIntermedia) : undefined,
        LineaBase: metaHistorico?.LineaBase ? parseFloat(metaHistorico.LineaBase) : undefined,
        Meta2018: metaHistorico?.Meta2018 ? parseFloat(metaHistorico.Meta2018) : undefined
      };
    });

    // Crear ejes
    let dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = "date";
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.grid.template.strokeOpacity = 0.5; // Opacidad de las líneas de la cuadrícula vertical
    dateAxis.renderer.labels.template.fontSize = 8;
    // Mostrar todas las etiquetas del eje X
    dateAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      return 0; // Asegurarse de que las etiquetas estén centradas
    });
    dateAxis.renderer.minGridDistance = 25;
    dateAxis.renderer.labels.template.truncate = false;


    // Configuración de axisFills
    dateAxis.renderer.axisFills.template.disabled = false;
    dateAxis.renderer.axisFills.template.fillOpacity = 0.1;
    dateAxis.renderer.axisFills.template.fill = am4core.color("gray");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 10;
    // Reducir el tamaño de la fuente de las etiquetas en el eje X

    // Configuración de axisFills
    dateAxis.renderer.axisFills.template.disabled = false;
    dateAxis.renderer.axisFills.template.fillOpacity = 0.1;
    dateAxis.renderer.axisFills.template.fill = am4core.color("gray");

    valueAxis.renderer.labels.template.fontSize = 15; // Cambiar el valor según el tamaño deseado

    valueAxis.renderer.grid.template.disabled = true; // Desactivar líneas horizontales
    valueAxis.tooltip!.disabled = true;


    // Función para crear series
    function createSeries(field: string, name: string, color: am4core.Color) {
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "date";
      series.strokeWidth = 2;
      series.stroke = color;
      series.name = name;

      // Configuración de los puntos en la línea
      let bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 5;
      bullet.circle.fill = color;
      bullet.circle.stroke = color;

      // Etiquetas sobre los puntos
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = `{${field}.formatNumber('#,###')}`;
      labelBullet.label.dy = -10;
      labelBullet.label.fontSize = 9;

      // Configuración del tooltip
      // Añadir tooltip personalizado
      series.tooltipText = "{name}[/] {categoryX}:[bold]{valueY.formatNumber('#,###')}";


      // Configuración del fondo, borde y color del texto del tooltip
    series.tooltip!.background.fill = am4core.color("#ffffff"); // Fondo blanco
    series.tooltip!.background.fillOpacity = 1; // Fondo sólido
    series.tooltip!.background.stroke = color; // Borde del color de la serie
    series.tooltip!.background.strokeWidth = 2; // Ancho del borde

    // Cambiar el color del texto del tooltip
    series.tooltip!.label.fill = am4core.color("#000000"); // Texto negro
    series.tooltip!.label.fontSize = 12;

    series.tooltip!.label.adapter.add("fill", () => am4core.color("#000000")); // Texto negro
    series.tooltip!.getFillFromObject = false; // fsle para no heredar el color
    series.tooltip!.getStrokeFromObject = false;

    // Asegurarte de que el tooltip no cambie de color inesperadamente
    series.tooltip!.background.adapter.add("fill", () => am4core.color("#ffffff")); // Fondo blanco constante
    series.tooltip!.background.adapter.add("stroke", () => color); // Borde según el color de la serie
    series.tooltip!.label.adapter.add("fill", () => am4core.color("#000000")); // Texto negro constante

    }


    // Crear series para los valores que pueden estar presentes en METASHISTORICO
    createSeries("MetaAlcanzada", "Meta Alcanzada", am4core.color("#00a94f"));
    createSeries("MetaIntermedia", "Meta Intermedia", am4core.color("#072a5f"));
    createSeries("LineaBase", "Línea Base", am4core.color("#c1c1c1"));
    createSeries("Meta2018", "Meta", am4core.color("#868484"));

    // Configurar leyenda y cursor
    chart.legend = new am4charts.Legend();


    chart.legend.labels.template.fontSize = 10; // Tamaño de la fuente de la leyend

    let cursor = new am4charts.XYCursor();
    cursor.lineY.disabled = true;
    cursor.xAxis = dateAxis;
    chart.cursor = cursor;

    dateAxis.tooltip!.background.fill = am4core.color("#cf1010");
    dateAxis.tooltip!.label.fontSize = 12;

    this.chart = chart;
  }



  ngOnDestroy(): void {
    // Destruir la instancia del gráfico para evitar problemas de memoria
    if (this.chart) {
      this.chart.dispose();
    }
  }

}
