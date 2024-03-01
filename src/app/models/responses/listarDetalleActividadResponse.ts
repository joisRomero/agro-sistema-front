export interface ListarDetalleActividadResponse {
    idActividad: number;
    fechaActividad: string;
    descripcionActividad: string | null;
    idTipoActividad: number;
    descripcionTipoActividad: string | null;
    listaDetalleTrabajadores: DetalleTrabajadoresDTO[] | null;
    lsitaDetalleGastos: DetalleGastosDTO[] | null;
}

export interface DetalleTrabajadoresDTO {
    idTrabajador: number;
    descripcionTrabajador: string;
    cantidadTrabajador: number;
    costoUnitario: number;
    costoTotal: number;
    idTipoTrabajador: number;
    descripcionTipoTrabajador: string;
}

export interface DetalleGastosDTO {
    idGastoDetalle: number;
    descripcionGastoDetalle: string;
    cantidadGastoDetalle: number;
    costoUnitarioGastoDetalle: number;
    costoTotalGastoDetalle: number;
    fechaGastoDetalle: string;
    idTipoGasto: number;
    nombreTipoGasto: string;
}