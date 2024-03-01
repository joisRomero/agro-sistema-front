export class ListaPaginaActividadResponse {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    data: ListaPaginaActividadResponseItem[] = [];  
}

export interface ListaPaginaActividadResponseItem {
    correlativo: number;
    idActividad: number;
    fechaActividad: Date;
    descripcionActividad?: string;
    nombreTipoActividad?: string;
}