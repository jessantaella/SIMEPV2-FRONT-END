export class SectorResponse {
    ID_SECTOR?: number;
    NOMBRE?: string;
    ICONO?: string;
    CONSECUTIVO?: number;

    constructor() {
        this.ID_SECTOR = 0;
        this.NOMBRE = '';
        this.ICONO = '';
        this.CONSECUTIVO = 0;
    }
}