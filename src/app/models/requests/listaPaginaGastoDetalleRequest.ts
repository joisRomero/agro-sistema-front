export interface ListaPaginaGastoDetalleRequest {
    idCampania: number;
    idTipoGasto: number | null;
    fechaGasto: string | null;
    pageNumber: number;
    pageSize: number;
}
