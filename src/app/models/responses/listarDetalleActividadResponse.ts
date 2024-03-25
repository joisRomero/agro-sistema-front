export interface ListarDetalleActividadResponse {
    idActividad: number | null;
    fechaActividad: Date;
    descripcionActividad: string | null;
    idTipoActividad: number | null;
    descripcionTipoActividad: string | null;
    listaDetalleTrabajadores: DetalleTrabajadoresDTO[] | null;
    listaDetalleGastos: DetalleGastosDTO[] | null;
    listaDetalleAbonacion: DetalleAbonacionDTO[] | null;
    listaDetalleFumigacionDetalle: DetalleFumigacionDTO[] | null;
    cantidadFumigacion: number | null;
    unidadDatoComunFumigacion: number | null;
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

export interface DetalleAbonacionDTO {
    idAbonacion: number;
    cantidadAbonacion: number;
    unidadDatoComunAbonacion: number;
    unidadDescripcionAbonacion: string;
    idAbono: number;
}

export interface DetalleFumigacionDTO {
    idFumigacionDetalle: number;
    cantidadFumigacionDetalle: number;
    unidadDatoComunFumigacionDetalle: number;
    idAgroQuimico: number;
    unidadDescripcionFumigacionDetalle: string;
}
