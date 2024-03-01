export interface ListaPaginaTipoGastoRequest {
    nombre: string | null;
    idUsuario: number;
    pageNumber: number;
    pageSize: number;
}
