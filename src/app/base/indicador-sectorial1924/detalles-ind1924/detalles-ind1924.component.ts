import { Component } from '@angular/core';
import { ObjetivoSectorial } from '../../Models/ObjetivoSectorial';
import { IndicadorSectorial } from '../../Models/IndicadorSectorial';

@Component({
  selector: 'app-detalles-ind1924',
  templateUrl: './detalles-ind1924.component.html',
  styleUrls: ['./detalles-ind1924.component.scss']
})
export class DetallesInd1924Component {
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

}
