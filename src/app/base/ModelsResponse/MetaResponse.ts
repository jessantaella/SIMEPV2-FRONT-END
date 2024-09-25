export class MetaResponse {
    CICLO: number;
    MI: number | null;          // Usamos "?" para indicar que el campo puede ser opcional (null o undefined)
    VALOR: number | null;
    VALORLB: number | null;
    META: number | null;
    METASHISTORICO: string;

    constructor() {
        this.CICLO = 0;
        this.MI = null;
        this.VALOR = 0;
        this.VALORLB = 0;
        this.META = 0;
        this.METASHISTORICO = '';
    }
}