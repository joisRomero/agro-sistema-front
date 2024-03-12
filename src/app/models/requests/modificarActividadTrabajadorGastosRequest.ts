
export interface ModificarActividadTrabajadorGastosRequest {
    idActividad: number;
    fechaActividad: string;
    descripcionActividad: string | null;
    idCampania: number;
    idTipoActividad: number;
    usuarioModifica: string | null;
    listaTrabajador: TrabajadorModificarDTO[] | null;
    listaGasto: GastoTrabajadorModificarDTO[] | null;

    cantidadSemillaActividad: number | null;
    unidadSemilla: number | null;

    cantidadFumigacion: number | null;
    unidadFumigacion: number | null;

    listaAbonacion: AbonacionModificarDTO[] | null;
    listaFumigacionDetalle: FumigacionDetalleModificarDTO[] | null;
}

export interface TrabajadorModificarDTO {
    idTrabajador: number | null;
    descripcionTrabajador: string | null;
    cantidadTrabajador: number;
    costoUnitario: number;
    costoTotal: number;
    idTipoTrabajador: number;
}

export interface GastoTrabajadorModificarDTO {
    idGasto: number | null;
    descripcionGasto: string | null;
    cantidadGasto: number;
    costoUnitario: number;
    costoTotal: number;
    idTipoGasto: number;
}

export interface AbonacionModificarDTO {
    idAbonacion: number | null;
    cantidadAbonacion: number | null;
    unidadAbonacion: number | null;
    idAbono: number | null;
}

export interface FumigacionDetalleModificarDTO {
    idFumigacionDetalle: number | null;
    cantidadFumigacionDetalle: number | null;
    unidadFumigacionDetalle: number | null;
    idAgroquimico: number | null;
}