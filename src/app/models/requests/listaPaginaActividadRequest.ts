export interface ListaPaginaActividadRequest {
    idCampania: number;
    fechaActividad: Date;
    idTipoActividad: number;
    pageNumber: number;
    pageSize: number;
}