import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {


  @Input() data: { Ciclo: number, MetaAlcanzada: string }[] = [];

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

  createChart(data: { Ciclo: number, MetaAlcanzada: string }[]) {
    // Crear la instancia del gráfico
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    
    // Asignar los datos recibidos al gráfico
    chart.data = data.map(item => ({
        date: item.Ciclo.toString(),
        value: parseFloat(item.MetaAlcanzada) // Convertir el valor de MetaAlcanzada a número
    }));

    // Crear ejes
    let dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = "date";
    dateAxis.renderer.grid.template.disabled = true; // Desactivar líneas verticales
    dateAxis.renderer.grid.template.strokeOpacity = 0.5; // Opacidad de las líneas de la cuadrícula vertical

    // Mostrar todas las etiquetas del eje X
    dateAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
        return 0; // Asegurarse de que las etiquetas estén centradas
    });
    dateAxis.renderer.minGridDistance = 30; // Ajustar la distancia mínima entre las etiquetas

    // Reducir el tamaño de la fuente de las etiquetas en el eje X
    dateAxis.renderer.labels.template.fontSize = 10; // Cambiar el valor según el tamaño deseado


    // Configuración de axisFills
    dateAxis.renderer.axisFills.template.disabled = false;
    dateAxis.renderer.axisFills.template.fillOpacity = 0.1;
    dateAxis.renderer.axisFills.template.fill = am4core.color("gray");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.renderer.labels.template.fontSize = 15; // Cambiar el valor según el tamaño deseado

    valueAxis.renderer.grid.template.disabled = true; // Desactivar líneas horizontales
    valueAxis.tooltip!.disabled = true;

    // Crear serie
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.strokeWidth = 2; // Ancho de línea
    series.stroke = am4core.color("#00A94F"); // Cambiar color
    series.tensionX = 1; // Suavizado de la línea

    // Añadir puntos en la línea
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 5;
    bullet.circle.fill = am4core.color("#00A94F");
    bullet.circle.stroke = am4core.color("#00A94F");

    // Añadir etiquetas sobre los puntos
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY.formatNumber('#,###')}";
    labelBullet.label.dy = -10;
    labelBullet.label.fontSize = 10;

    // Añadir tooltip personalizado
    series.tooltipText = "{name}[/] {categoryX}:[bold]{valueY.formatNumber('#,###')}";
    series.tooltip!.background.stroke = am4core.color("#00A94F");
    series.tooltip!.background.strokeWidth = 2;
    series.tooltip!.background.fill = am4core.color("#ffffff"); // Cambiar el color de fondo (blanco en este caso)
    series.tooltip!.background.fillOpacity = 0.1;
    series.tooltip!.pointerOrientation = "down";
    series.tooltip!.label.fontSize = 12; // Ajusta el tamaño según tu necesidad


    series.adapter.add("tooltipX", (tooltipX, target) => {
      // Obtener la posición del tooltip en base a la posición del punto de la serie
      let dataItem = target.tooltipDataItem;
      let categoryIndex = chart.data.indexOf(dataItem.dataContext); // Índice del dato en la serie
      let totalItems = chart.data.length; // Total de elementos en la serie
  
      // Obtener el ancho del gráfico
      let chartWidth = chart.plotContainer.pixelWidth;
  
      // Calcular posición del tooltip según el índice del dato
      if (categoryIndex < totalItems * 0.25) {
          // Si el punto está en el primer 25% del gráfico, orientamos el tooltip a la derecha
          target.tooltip!.pointerOrientation = "left";
          target.tooltip!.align = "right"; // Tooltip alineado a la derecha del punto
      } else if (categoryIndex > totalItems * 0.75) {
          // Si el punto está en el último 25% del gráfico, orientamos el tooltip a la izquierda
          target.tooltip!.pointerOrientation = "right";
          target.tooltip!.align = "left"; // Tooltip alineado a la izquierda del punto
      } else {
          // Si el punto está en el centro del gráfico, orientamos el tooltip hacia abajo
          target.tooltip!.pointerOrientation = "down";
          target.tooltip!.align = "left"; // Tooltip centrado en el punto
      }
  
      return tooltipX; // Devolver la posición original del tooltip en X
  });

    // Añadir una leyenda para la serie
    chart.legend = new am4charts.Legend();
    series.name = "Meta Alcanzada";

    // Añadir un cursor
    let cursor = new am4charts.XYCursor();
    cursor.lineY.disabled = true;
    cursor.xAxis = dateAxis;
    cursor.lineX.stroke = am4core.color("#cf1010");
    cursor.lineX.strokeWidth = 1;
    cursor.lineX.strokeOpacity = 1;
    cursor.behavior = "none"; 
    chart.cursor = cursor;

    // Mostrar la línea vertical solo cuando se pase el cursor sobre un punto
    cursor.events.on("cursorpositionchanged", function(ev) {
        let dataItem = dateAxis.getSeriesDataItem(series, cursor.xPosition);
        if (dataItem) {
            cursor.lineX.strokeOpacity = 1;
        } else {
            cursor.lineX.strokeOpacity = 0;
        }
    });

    // Cambiar el color de la etiqueta del año a rojo en el tooltip
    dateAxis.tooltip!.background.fill = am4core.color("#cf1010");
    dateAxis.tooltip!.background.stroke = am4core.color("#cf1010");
    dateAxis.tooltip!.label.fill = am4core.color("#ffffff");
    dateAxis.tooltip!.label.fontSize = 12;
    dateAxis.tooltip!.label.padding(5, 5, 5, 5);

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
