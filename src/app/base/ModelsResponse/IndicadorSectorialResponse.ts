export class IndicadorSectorialResponse {
    METATEXT?: string;
    ID_INDICADOR?: number;
    NUM_OBJETIVO?: number;
    OBJETIVO?: string;
    INDICADOR?: string;
    NUM_INDICADOR?: number;
    FUENTE?: string;
    TIPO?: string;
    TIPO_INDICADOR?: string;

    ID_OBJ?: number;
    ID_IND?: number;
    SUB?: string;
    LIGA?: string;

    NOMBRE?: string;
    DESCRIPCION?: string;
    METODO?: string;
    VALOR_LB?: string;
    PERIODICIDAD?: string;
    UDM?: string;
    META?: number;
    ID_NIVEL?: number;
    NIVEL?: string;

    ID_MATRIZ?: number;
    CICLO?: number;
    RAMO?: string;
    Nombre_Ramo?: string;
    CAMBIO_TEXTO?: string;

    META_ALCANZADA?: string;
    PORCENTAJE_AVANCE?: string;

    LB_COLOR?: string;
    MALCANZADA_COLOR?: string;
    PORCENTAJE_COLOR?: string;
    META_COLOR?: string;

    CLARIDAD?: boolean;
    RELEVANCIA?: boolean;
    MONITOREABILIDAD?: boolean;
    PERTINENCIA?: boolean;

    MAX_META_ALCANZADA?: string;
    MIN_META_ALCANZADA?: string;
    AVG_META_ALCANZADA?: string;
    MAX_META_PLANEADA?: string;
    MIN_META_PLANEADA?: string;
    AVG_META_PLANEADA?: string;

    TIPO_INDICADOR_GRAFICA?: string;
    TENDENCIA?: string;
    NIVEL_DESAGREGACION?: string;

    COMENTARIO?: string;

    ENFOQUE_RES?: string;
    ENFOQUE_INDICADOR?: string;
    ACUM_PER?: string;
    DOF_DESCRIPCION_META?: string;
    DOF_DESCRIPCION_LB?: string;
    ADECUACION?: boolean;

    DATO_CATALOGO?: string;
    DEFINICION_META?: string;
    DESCRIPCION_OBJETIVO?: string;
    FUENTE_INFORMACION?: string;
    METODO_CALCULO?: string;
    NOMBRE_META?: string;

    constructor() {
        this.METATEXT = '';
        this.ID_INDICADOR = 0;
        this.NUM_OBJETIVO = 0;
        this.OBJETIVO = '';
        this.INDICADOR = '';
        this.NUM_INDICADOR = 0;
        this.FUENTE = '';
        this.TIPO = '';
        this.TIPO_INDICADOR = '';

        this.ID_OBJ = 0;
        this.ID_IND = 0;
        this.SUB = '';
        this.LIGA = '';

        this.NOMBRE = '';
        this.DESCRIPCION = '';
        this.METODO = '';
        this.VALOR_LB = '';
        this.PERIODICIDAD = '';
        this.UDM = '';
        this.META = undefined;
        this.ID_NIVEL = 0;
        this.NIVEL = '';

        this.ID_MATRIZ = 0;
        this.CICLO = 0;
        this.RAMO = '';
        this.Nombre_Ramo = '';
        this.CAMBIO_TEXTO = '';

        this.META_ALCANZADA = '';
        this.PORCENTAJE_AVANCE = '';

        this.LB_COLOR = '';
        this.MALCANZADA_COLOR = '';
        this.PORCENTAJE_COLOR = '';
        this.META_COLOR = '';

        this.CLARIDAD = false;
        this.RELEVANCIA = false;
        this.MONITOREABILIDAD = false;
        this.PERTINENCIA = false;

        this.MAX_META_ALCANZADA = '';
        this.MIN_META_ALCANZADA = '';
        this.AVG_META_ALCANZADA = '';
        this.MAX_META_PLANEADA = '';
        this.MIN_META_PLANEADA = '';
        this.AVG_META_PLANEADA = '';

        this.TIPO_INDICADOR_GRAFICA = '';
        this.TENDENCIA = '';
        this.NIVEL_DESAGREGACION = '';

        this.COMENTARIO = '';

        this.ENFOQUE_RES = '';
        this.ENFOQUE_INDICADOR = '';
        this.ACUM_PER = '';
        this.DOF_DESCRIPCION_META = '';
        this.DOF_DESCRIPCION_LB = '';
        this.ADECUACION = false;

        this.DATO_CATALOGO = '';
        this.DEFINICION_META = '';
        this.DESCRIPCION_OBJETIVO = '';
        this.FUENTE_INFORMACION = '';
        this.METODO_CALCULO = '';
        this.NOMBRE_META = '';
    }
}