export interface ListaPaginaGastoDetalleRequest {
    idCampania: number;
    nombreTipoGasto: string | null;
    fechaGasto: string | null;
    pageNumber: number;
    pageSize: number;
}
