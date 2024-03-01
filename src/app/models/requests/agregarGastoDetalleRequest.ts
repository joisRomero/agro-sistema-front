export interface AgregarGastoDetalleRequest {
    idCampania: number;
    idTipoGasto: number;
    fechaGasto: string;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
    descripcion: string | null;
    usuarioInserta: string | null;
}
