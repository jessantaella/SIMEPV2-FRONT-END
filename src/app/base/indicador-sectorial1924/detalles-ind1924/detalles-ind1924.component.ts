import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ObjetivoSectorial } from '../../Models/ObjetivoSectorial';
import { IndicadorSectorial } from '../../Models/IndicadorSectorial';

@Component({
  selector: 'app-detalles-ind1924',
  templateUrl: './detalles-ind1924.component.html',
  styleUrls: ['./detalles-ind1924.component.scss']
})
export class DetallesInd1924Component {
  @ViewChild('menuDesplegable') menuDesplegable!: ElementRef;
  screenWidth: number;

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

  constructor() {
    this.screenWidth = window.innerWidth; // Inicializa con el tamaño actual de la pantalla
  }
  
  ngAfterViewInit(): void {
    this.screenWidth = window.innerWidth;
    this.changeCollapseMode(this.screenWidth);
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = (event.target as Window).innerWidth;
    this.changeCollapseMode(this.screenWidth);
  }
  
  changeCollapseMode(innerWidth: number) {
    if(innerWidth > 992){
      this.menuDesplegable.nativeElement.classList.add('collapse-horizontal');
    }else{
      this.menuDesplegable.nativeElement.classList.remove('collapse-horizontal');
    }

  }
  

}
