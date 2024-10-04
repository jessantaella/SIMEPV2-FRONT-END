export class SectorResponse {
    ID_SECTOR?: number;
    SECTOR?: string;
    ICONO?: string;
    CONSECUTIVO?: number;

    constructor() {
        this.ID_SECTOR = 0;
        this.SECTOR = '';
        this.ICONO = '';
        this.CONSECUTIVO = 0;
    }
}