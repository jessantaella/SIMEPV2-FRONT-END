import { ChartDataset } from "chart.js";

export class GraficaModel {
    LABELS?: String[];
    DATASETS?: ChartDataset<'line', (number | null)[]>[];
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