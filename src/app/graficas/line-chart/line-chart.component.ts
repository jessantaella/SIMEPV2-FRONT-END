import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart | undefined;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    // Crear la instancia del gráfico
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    
    // Definir los datos
    chart.data = [
      { "date": "2010", "value": 23993 },
      { "date": "2011", "value": 24317 },
      { "date": "2012", "value": 27337 },
      { "date": "2013", "value": 28224 },
      { "date": "2014", "value": 28200 },
      { "date": "2015", "value": 28202 },
      { "date": "2016", "value": 29000 }
    ];
  
    // Crear ejes
    let dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());

    dateAxis.dataFields.category = "date";
    dateAxis.renderer.grid.template.disabled = true; // Activar líneas verticales
    dateAxis.renderer.grid.template.strokeOpacity = 0.5; // Opacidad de las líneas de la cuadrícula vertical
    
    // Configuración de axisFills (rellenos en las áreas del eje de categorías)
    dateAxis.renderer.axisFills.template.disabled = false; // Activar los rellenos
    dateAxis.renderer.axisFills.template.fillOpacity = 0.1; // Definir opacidad del relleno
    dateAxis.renderer.axisFills.template.fill = am4core.color("gray"); // Color rojo con transparencia en las columnas de fondo
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true; // Desactivar líneas horizontales
    valueAxis.tooltip!.disabled = true;

  
    // Crear serie
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.strokeWidth = 2; // Ancho de línea
    series.stroke = am4core.color("#00A94F"); // Cambiar color a azul
    series.tensionX = 0.8; // Suavizado de la línea
    
    // Añadir puntos grandes en la línea
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 5; // Tamaño más pequeño para los puntos
    bullet.circle.fill = am4core.color("#00A94F"); // Color blanco para los puntos
    bullet.circle.stroke = am4core.color("#00A94F"); // Bordes de los puntos en azul
    
    // Añadir etiquetas sobre los puntos con formato de miles
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY.formatNumber('#,###')}";
    labelBullet.label.dy = -10; // Ajustar la posición de la etiqueta por encima del punto
    labelBullet.label.fontSize = 10; // Tamaño de fuente ajustado


    // Añadir tooltip personalizado
series.tooltipText = "{name}[/]: {categoryX} Valor: {valueY.formatNumber('#,###')}";

// Personalizar el borde del tooltip, quitar fondo y agregar la punta
series.tooltip!.background.stroke = am4core.color("#00A94F"); // Borde verde
series.tooltip!.background.strokeWidth = 2;
series.tooltip!.background.fillOpacity = 0; // Fondo transparente
series.tooltip!.pointerOrientation = "down"; // Orientación de la punta hacia abajo (apuntando al punto)
//series.tooltip!.pointerLength = 10; // Ajustar el tamaño de la punta

    // Añadir una leyenda para la serie
    chart.legend = new am4charts.Legend();
    series.name = "Meta Alcanzada";
  
    // Añadir un cursor
    let cursor = new am4charts.XYCursor();
    cursor.lineY.disabled = true; // Desactivar la línea horizontal


    cursor.xAxis = dateAxis;
    cursor.lineX.stroke = am4core.color("#cf1010"); // Cambiar la línea vertical a rojo
    cursor.lineX.strokeWidth = 2; 
    cursor.lineX.strokeDasharray = ""; 
    cursor.lineX.strokeOpacity = 0; 
    cursor.behavior = "none"; 
    chart.cursor = cursor;

    // Mostrar la línea vertical solo cuando se pase el cursor sobre un punto
    cursor.events.on("cursorpositionchanged", function(ev) {
      let dataItem = dateAxis.getSeriesDataItem(series, cursor.xPosition);
      if (dataItem) {
        cursor.lineX.strokeOpacity = 1; // Mostrar línea roja si está sobre un punto
      } else {
        cursor.lineX.strokeOpacity = 0; // Ocultar la línea cuando no esté sobre un punto
      }
    });

    // Cambiar el color de la etiqueta del año a rojo en el tooltip
    dateAxis.tooltip!.background.fill = am4core.color("#cf1010"); // Color de fondo rojo claro
    dateAxis.tooltip!.background.stroke = am4core.color("#cf1010"); // Borde del tooltip rojo
    dateAxis.tooltip!.label.fill = am4core.color("#ffffff"); // Cambiar el color del texto del año a blanco
    dateAxis.tooltip!.label.fontSize = 12; // Ajustar el tamaño de fuente si es necesario
    dateAxis.tooltip!.label.padding(5, 5, 5, 5); // Añadir un padding más pequeño
    
    // Guardar referencia al gráfico para su destrucción posterior
    this.chart = chart;
}

  
  
  ngOnDestroy(): void {
    // Destruir la instancia del gráfico para evitar problemas de memoria
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
