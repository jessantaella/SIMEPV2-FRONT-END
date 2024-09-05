import { Component, ElementRef, ViewChild } from '@angular/core';
import { ObjetivoSectorial } from '../../Models/ObjetivoSectorial';
import { IndicadorSectorial } from '../../Models/IndicadorSectorial';

@Component({
  selector: 'app-detalles-ind1924',
  templateUrl: './detalles-ind1924.component.html',
  styleUrls: ['./detalles-ind1924.component.scss']
})
export class DetallesInd1924Component {
  @ViewChild('menuDesplegable') menuDesplegable!: ElementRef;
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
  

  mostrarOcultar() {
    const menuElement = this.menuDesplegable.nativeElement;
    const screenWidth = window.innerWidth; // Obtén el ancho de la pantalla
  
    if (menuElement.classList.contains('menuVisible')) {
      menuElement.classList.remove('menuVisible');
      
      if (screenWidth > 992) { 
        menuElement.style.maxWidth = "0";
        
      }else{
        menuElement.style.maxHeight = "0";
      }
      
      setTimeout(() =>{
        menuElement.style.display = "none";
      }, 300)
      menuElement.style.opacity = "0";
    } else {
      menuElement.style.display = "block";
      menuElement.classList.add('menuVisible');
      setTimeout(() =>{
        if (screenWidth > 992) { // Ajusta el tamaño según tu necesidad
          menuElement.style.maxWidth = "10000px";
          menuElement.style.maxHeight = "none";
        } else {
          menuElement.style.maxWidth = "none";
          menuElement.style.maxHeight = "10000px"; // Ajusta el tamaño según tu necesidad
        }
        menuElement.style.opacity = "1";
        menuElement.style.display = "block";
      }, 100)
    }
  }

}
