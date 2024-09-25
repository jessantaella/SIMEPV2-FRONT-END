export class ProgramaSectorial {
    ID_PROG_SECTORIAL?: number;
    ID_PROGRAMA?: number;
    ID_SECTOR?: number;
    CLASIFICACION?: number;
    NOMBRE?: string;
    URL_ICONO?: string;
    LIGA?: string;
    CONSECUTIVO?: number;
    EVALUACIONDESC?: string;
    EVALUACIONLLIGA?: string;
    EVALUACIONIMAGEN?: string;
    NOMBRESECTOR?: string;
    CALIF_OBJETIVOS?: number;
    CLASIF_OBJETIVOS?: string;
    CALIF_INDICADORES?: number;
    CLASIF_INDICADORES?: string;

    constructor() {
        this.ID_PROG_SECTORIAL = 0;
        this.ID_PROGRAMA = 0;
        this.ID_SECTOR = 0;
        this.CLASIFICACION = 0;
        this.NOMBRE = '';
        this.URL_ICONO = '';
        this.LIGA = '';
        this.CONSECUTIVO = 0;
        this.EVALUACIONDESC = '';
        this.EVALUACIONLLIGA = '';
        this.EVALUACIONIMAGEN = '';
        this.NOMBRESECTOR = '';
        this.CALIF_OBJETIVOS = 0;
        this.CLASIF_OBJETIVOS = '';
        this.CALIF_INDICADORES = 0;
        this.CLASIF_INDICADORES = '';
    }
}