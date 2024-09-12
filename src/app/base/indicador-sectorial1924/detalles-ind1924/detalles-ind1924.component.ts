import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ObjetivoSectorial } from '../../Models/ObjetivoSectorial';
import { IndicadorSectorial } from '../../Models/IndicadorSectorial';
import { DerechoSocialInd } from '../../Models/DerechoSocialInd';
import { ActivatedRoute } from '@angular/router';
import {Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-detalles-ind1924',
  templateUrl: './detalles-ind1924.component.html',
  styleUrls: ['./detalles-ind1924.component.scss']
})
export class DetallesInd1924Component {
  @ViewChild('menuDesplegable') menuDesplegable!: ElementRef;
  chart: any;
  idProgramaSector: string | null = null;
  screenWidth: number;
  listaDerechosSocialesAsociados: DerechoSocialInd[] = [
    {
      DER_DESCRIPCION: 'Educación',
      DER_ID: 1
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
    setTimeout(() =>{
      this.crearGrafica(); 
    })
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idProgramaSector = params['idProgramaSect'];
      console.log({program: params['idProgramaSect']});
    }); 
    

  
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

  crearGrafica() {
    Chart.register(...registerables);
    this.chart = new Chart('divGrafIndicadorSectorial', {
      type: 'line', // Tipo de gráfico: línea
      data: {
        labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], // Años
        datasets: [
          {
            label: 'Línea Base',
            data: [null, null, null, null, null, 75,null,null,null,null,null,null], // Un solo punto para Línea Base
            borderColor: 'gray',
            backgroundColor: 'gray',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false,
            pointStyle: 'circle',
            pointRadius: 7,
            pointHoverRadius: 7
          },
          {
            label: 'Meta Planteada',
            data: [null, null, null, null, null, null, null,null, null, null, null, 80], // Datos de Meta Intermedia
            borderColor: 'gray',
            backgroundColor: 'gray',
            tension: 0.4,
            fill: false,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Meta Alcanzada',
            data: [81.5, 80.3, 79, 78.3, 76.9, 75, 73.7, 73.5, 70.8, 69.5, null, null], // Datos de Meta Alcanzada
            borderColor: 'green',
            backgroundColor: 'green',
            tension: 0.4, // Suavizado de las líneas
            fill: false,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Meta Intermedia',
            data: [null, null, null, null, null, null, null,76.7, 77.5, 78.3, 79.2, 80], // Datos de Meta Intermedia
            borderColor: 'blue',
            backgroundColor: 'blue',
            tension: 0.4,
            fill: false,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7
          },
        ]
      },
      options: {
        responsive: true,
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
