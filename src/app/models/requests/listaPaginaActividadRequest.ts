export interface ListaPaginaActividadRequest {
    idCampania: number;
    fechaActividad: Date;
    nombreTipoActividad: string;
    pageNumber: number;
    pageSize: number;
}