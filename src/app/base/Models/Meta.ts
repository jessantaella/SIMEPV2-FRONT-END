export class Meta {
    CICLO?: number;
    MI?: number;          // Usamos "?" para indicar que el campo puede ser opcional (null o undefined)
    VALOR?: number;
    VALORLB?: number;
    META?: number;
    METASHISTORICO?: string;

    constructor() {
        this.CICLO = 0;
        this.MI = 0;
        this.VALOR = 0;
        this.VALORLB = 0;
        this.META = 0;
        this.METASHISTORICO = '';
    }
}