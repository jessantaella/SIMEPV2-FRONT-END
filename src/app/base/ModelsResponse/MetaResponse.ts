export class MetaResponse {
    CICLO: number;
    MI: number | null;          // Usamos "?" para indicar que el campo puede ser opcional (null o undefined)
    VALOR: number | null;
    VALOR_LB: number | null;
    META: number | null;
    METAS_HISTORICO: string;

    constructor() {
        this.CICLO = 0;
        this.MI = null;
        this.VALOR = 0;
        this.VALOR_LB = 0;
        this.META = 0;
        this.METAS_HISTORICO = '';
    }
}