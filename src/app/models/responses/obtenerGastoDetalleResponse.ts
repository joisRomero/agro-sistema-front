export interface ObtenerGastoDetalleResponse {
    idGastoDetalle: number;
    idTipoGasto: number;
    fechaGasto: Date;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
    descripcion: string | null;
}
