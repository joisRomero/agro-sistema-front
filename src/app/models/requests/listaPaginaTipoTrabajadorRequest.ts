export interface ListaPaginaTipoTrabajadorRequest {
    nombreTipoTrabajador: string | null;
    idUsuario: number;
    pageSize: number;
    pageNumber: number;
}
