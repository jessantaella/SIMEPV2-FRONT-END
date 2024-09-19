export class GraficaModel {
    LABELS?: String[];
    DATASETS?: DatasetGrafica[];
    TITULO?: String;
    MIN_VALOR?: number;
    MAX_VALOR?: number;

    constructor() {
        this.LABELS = [];
        this.DATASETS = [];
        this.TITULO = '';
        this.MIN_VALOR = 0;
        this.MAX_VALOR = 100;
    }
}

export class DatasetGrafica {
    label?: String;
    data?: (number|null|undefined)[];
    borderColor?: String;
    backgroundColor?: String;
    pointRadius?: number | null;

    constructor (){

    }

}