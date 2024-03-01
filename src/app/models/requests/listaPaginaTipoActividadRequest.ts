export interface ListaPaginaTipoActividadRequest {
    nombreTipoActividad: string | null;
    realizadaPorTipoActividad: string | null;
    idUsuario: number;
    pageSize: number;
    pageNumber: number;
}