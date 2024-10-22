import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';


@Component({
  selector: 'app-line-chart-multiserie',
  templateUrl: './line-chart-multiserie.component.html',
  styleUrls: ['./line-chart-multiserie.component.scss']
})
export class LineChartMultiserieComponent implements OnInit, OnDestroy {


  //@Input() data: { Ciclo: number, MetaAlcanzada: string }[] = [];

  data = [
    {
      "CICLO": 2006,
      "MI": null,
      "VALOR": 63.97,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2006\",\"MetaAlcanzada\":\"63.97\"}"
    },
    {
      "CICLO": 2007,
      "MI": null,
      "VALOR": 66.21,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2007\",\"MetaAlcanzada\":\"66.21\"}"
    },
    {
      "CICLO": 2008,
      "MI": null,
      "VALOR": 66.71,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2008\",\"MetaAlcanzada\":\"66.71\"}"
    },
    {
      "CICLO": 2009,
      "MI": null,
      "VALOR": 65.22,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2009\",\"MetaAlcanzada\":\"65.22\"}"
    },
    {
      "CICLO": 2010,
      "MI": null,
      "VALOR": 65.9,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2010\",\"MetaAlcanzada\":\"65.90\"}"
    },
    {
      "CICLO": 2011,
      "MI": null,
      "VALOR": 58.18,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2011\",\"MetaAlcanzada\":\"58.18\"}"
    },
    {
      "CICLO": 2012,
      "MI": null,
      "VALOR": null,
      "VALORLB": 63,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2012\",\"LineaBase\":\"63.00\"}"
    },
    {
      "CICLO": 2013,
      "MI": 64,
      "VALOR": 68,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2013\",\"MetaAlcanzada\":\"68.00\",\"MetaIntermedia\":\"64.00\"}"
    },
    {
      "CICLO": 2014,
      "MI": 66.1,
      "VALOR": 67.31,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2014\",\"MetaAlcanzada\":\"67.31\",\"MetaIntermedia\":\"66.10\"}"
    },
    {
      "CICLO": 2015,
      "MI": 68.2,
      "VALOR": 63.99,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2015\",\"MetaAlcanzada\":\"63.99\",\"MetaIntermedia\":\"68.20\"}"
    },
    {
      "CICLO": 2016,
      "MI": 70.4,
      "VALOR": 61.7,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2016\",\"MetaAlcanzada\":\"61.70\",\"MetaIntermedia\":\"70.40\"}"
    },
    {
      "CICLO": 2017,
      "MI": 72.7,
      "VALOR": 59.1,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2017\",\"MetaAlcanzada\":\"59.10\",\"MetaIntermedia\":\"72.70\"}"
    },
    {
      "CICLO": 2018,
      "MI": null,
      "VALOR": 55.7,
      "VALORLB": null,
      "META": 75,
      "METASHISTORICO": "{\"CICLO\":\"2018\",\"MetaAlcanzada\":\"55.70\",\"Meta2018\":\"75.00\"}"
    }]

  private chart: am4charts.XYChart | undefined;

  constructor() { }

  ngOnInit(): void { 
    this.createChart(this.data)
  }

  ngOnChanges(changes: SimpleChanges) {
    // Verificar si el valor de 'data' ha cambiado
    if (changes['data'] && changes['data'].currentValue) {
      // Llamar a createChart con los nuevos datos
      this.chart?.dispose();
      this.createChart(changes['data'].currentValue);
    }
  }

  createChart(data: { CICLO: number | null, MI: number | null, VALOR: number | null, VALORLB: number | null, META: number | null, METASHISTORICO: string }[]) {
    // Crear la instancia del gráfico
    let chart = am4core.create('chartdiv', am4charts.XYChart);

    // Asignar los datos recibidos al gráfico
    chart.data = data.map(item => {
        let metaHistorico;
        try {
            metaHistorico = JSON.parse(item.METASHISTORICO); // Intentar parsear el campo METASHISTORICO
        } catch (e) {
            console.error('Error parsing METASHISTORICO:', e);
            metaHistorico = {}; // Establecer como un objeto vacío en caso de error
        }

        return {
            date: metaHistorico?.CICLO ? metaHistorico.CICLO.toString() : "N/A", // Asegurarse de que CICLO no es undefined
            MI: item.MI !== null ? item.MI : undefined, // undefined si es null para cortar la gráfica
            VALOR: item.VALOR !== null ? item.VALOR : undefined,
            VALORLB: item.VALORLB !== null ? item.VALORLB : undefined,
            META: item.META !== null ? item.META : undefined
        };
    });

    // Crear ejes
    let dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = "date";
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.grid.template.strokeOpacity = 0.5;

    dateAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
        return 0;
    });
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.renderer.labels.template.fontSize = 10;

    dateAxis.renderer.axisFills.template.disabled = false;
    dateAxis.renderer.axisFills.template.fillOpacity = 0.1;
    dateAxis.renderer.axisFills.template.fill = am4core.color("gray");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 15;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.tooltip!.disabled = true;

    // Función para crear una serie genérica
    function createSeries(field: string, name: string, color: am4core.Color) {
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "date";
        series.strokeWidth = 2;
        series.stroke = color;
        series.tensionX = 1; // Suavizado de la línea

        // Añadir puntos en la línea
        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 5;
        bullet.circle.fill = color;
        bullet.circle.stroke = color;

        // Añadir etiquetas sobre los puntos
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = `{${field}.formatNumber('#,###')}`;
        labelBullet.label.dy = -10;
        labelBullet.label.fontSize = 10;

        // Añadir tooltip personalizado
        series.tooltipText = `{name}[/] {categoryX}:[bold]{valueY.formatNumber('#,###')}`;
        series.tooltip!.background.stroke = color;
        series.tooltip!.background.strokeWidth = 2;
        series.tooltip!.background.fill = am4core.color("#ffffff");
        series.tooltip!.background.fillOpacity = 0.1;
        series.tooltip!.pointerOrientation = "down";
        series.tooltip!.label.fontSize = 12;

        series.adapter.add("tooltipX", (tooltipX, target) => {
            let dataItem = target.tooltipDataItem;
            let categoryIndex = chart.data.indexOf(dataItem.dataContext);
            let totalItems = chart.data.length;

            if (categoryIndex < totalItems * 0.25) {
                target.tooltip!.pointerOrientation = "left";
                target.tooltip!.align = "right";
            } else if (categoryIndex > totalItems * 0.75) {
                target.tooltip!.pointerOrientation = "right";
                target.tooltip!.align = "left";
            } else {
                target.tooltip!.pointerOrientation = "down";
                target.tooltip!.align = "left";
            }

            return tooltipX;
        });

        series.name = name;
    }

    // Crear series para MI, VALOR, VALORLB, y META
    createSeries("MI", "MI", am4core.color("#00A94F"));
    createSeries("VALOR", "Valor", am4core.color("#F57C00"));
    createSeries("VALORLB", "ValorLB", am4core.color("#E53935"));
    createSeries("META", "Meta", am4core.color("#1E88E5"));

    // Añadir leyenda
    chart.legend = new am4charts.Legend();

// Añadir cursor
let cursor = new am4charts.XYCursor();
cursor.lineY.disabled = true;
cursor.xAxis = dateAxis;
cursor.lineX.stroke = am4core.color("#cf1010");
cursor.lineX.strokeWidth = 1;
cursor.lineX.strokeOpacity = 1;
cursor.behavior = "none";
chart.cursor = cursor;

cursor.events.on("cursorpositionchanged", function(ev) {
    // Comprobar que existe al menos una serie antes de intentar acceder a ella
    let series = chart.series.length > 0 ? chart.series.getIndex(0) : undefined;
    if (series) {
        let dataItem = dateAxis.getSeriesDataItem(series, cursor.xPosition);
        cursor.lineX.strokeOpacity = dataItem ? 1 : 0;
    } else {
        cursor.lineX.strokeOpacity = 0;
    }
});

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
