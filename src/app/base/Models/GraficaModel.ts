import { ChartDataset } from "chart.js";

export class GraficaModel {
    LABELS?: string[];
    DATASETS?: ChartDataset<'line', (number | null)[]>[];
    TITULO?: string;
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