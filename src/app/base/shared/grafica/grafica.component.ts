import { Component, Input } from '@angular/core';
import {Chart, ChartDataset, registerables } from 'chart.js';
import { GraficaModel } from '../../Models/GraficaModel';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent {
  @Input() chartData: GraficaModel = {};

  chart: any;

  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.crearGrafica(); 
    })
    
  }


  crearGrafica() {
    Chart.register(...registerables);
    this.chart = new Chart('divGrafIndicadorSectorial', {
      type: 'line', // Tipo de gráfico: línea
      data: {
        labels: this.chartData.LABELS,
        datasets: this.chartData.DATASETS!.map(dataset => {
          return {
            label: dataset.label || '', // O un valor por defecto
            data: dataset.data || [], // O un array vacío como valor por defecto
            borderColor: dataset.borderColor || 'gray', // O un color por defecto
            backgroundColor: dataset.backgroundColor || 'gray', // O un color por defecto
            pointRadius: dataset.pointRadius ?? 4 // O un valor por defecto
          } as ChartDataset<'line', (number | null)[]>; // Asegúrate de especificar el tipo aquí
        }),
       
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000 // Ajusta la duración en milisegundos (2 segundos en este caso)
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: true,
            text: '1.1 Coeficiente de Autosuficiencia Alimentaria.',
            font: {
              size: 16
            }
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: this.chartData.MIN_VALOR, // El mínimo del eje Y es 65
            max: this.chartData.MAX_VALOR, // El máximo del eje Y es 85
          }
        }
      }
    });
  }

}
