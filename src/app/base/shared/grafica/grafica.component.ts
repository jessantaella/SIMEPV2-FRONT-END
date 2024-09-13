import { Component } from '@angular/core';
import {Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent {

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
        labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], // Años
        datasets: [
          {
            label: 'Línea Base',
            data: [null, null, null, null, null, 75,null,null,null,null,null,null], 
            borderColor: 'gray',
            backgroundColor: 'gray',
            pointRadius: 4,
          },
          {
            label: 'Meta Planteada',
            data: [null, null, null, null, null, null, null,null, null, null, null, 80],
            borderColor: 'gray',
            backgroundColor: 'gray',
            pointRadius: 4,
          },
          {
            label: 'Meta Alcanzada',
            data: [81.5, 80.3, 79, 78.3, 76.9, 75, 73.7, 73.5, 70.8, 69.5, null, null], 
            borderColor: 'green',
            backgroundColor: 'green',
            pointRadius: 4,
          },
          {
            label: 'Meta Intermedia',
            data: [null, null, null, null, null, null, null,76.7, 77.5, 78.3, 79.2, 80], 
            borderColor: 'blue',
            backgroundColor: 'blue',
            pointRadius: 4,
          },
        ]
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
            min: 65, // El mínimo del eje Y es 65
            max: 85, // El máximo del eje Y es 85
            ticks: {
              stepSize: 5 // Incrementos de 5 unidades
            }
          }
        }
      }
    });
  }

}
