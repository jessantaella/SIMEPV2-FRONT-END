import { IndicadorSectorial } from "./IndicadorSectorial";

export class ObjetivoSectorial {
    NUM_OBJETIVO: number;
    OBJETIVO: string;
    ID_INDICADOR: string;
    ID_PROGRAMA_SEC: number;
    TIPO_INDICADOR: string;
    INDICADORES_SECTORIALES?: IndicadorSectorial[];

    constructor() {
        this.NUM_OBJETIVO = 0;
        this.OBJETIVO = '';
        this.ID_INDICADOR = '';
        this.ID_PROGRAMA_SEC = 0;
        this.TIPO_INDICADOR = '';
        this.INDICADORES_SECTORIALES = [];

    }
}