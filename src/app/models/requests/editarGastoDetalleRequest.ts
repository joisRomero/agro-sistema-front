export interface EditarGastoDetalleRequest {
    idGastoDetalle: number;
    idTipoGasto: number;
    fechaGasto: string;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
    descripcion: string | null;
    usuarioModifica: string | null;
}
