export interface AgregarActividadTrabajadorRequest {
    fechaActividad: string;
    descripcionActividad: string | null;
    idCampania: number;
    idTipoActividad: number;
    usuarioInserta: string | null;

    cantidadSemillaActividad: number | null;
    unidadSemilla: number | null;

    cantidadFumigacion: number | null;
    unidadFumigacion: number | null;

    listaTrabajadores: TrabajadorDTO[] | null;
    listaGastos: GastoDTO[] | null;
    listaAbonacion: AbonacionDTO[] | null;
    listaFumigacionDetalle: FumigacionDetalleDTO[] | null;
}

export interface TrabajadorDTO {
    descripcionTrabajador: string | null;
    cantidadTrabajador: number;
    costoUnitario: number;
    costoTotal: number;
    idTipoTrabajador: number;
}

export interface GastoDTO {
    descripcionGasto: string | null;
    cantidadGasto: number;
    costoUnitario: number;
    costoTotal: number;
    idTipoGasto: number;
}

export interface AbonacionDTO {
    cantidadAbonacion: number | null;
    unidadAbonacion: number | null;
    idAbono: number | null;
}

export interface FumigacionDetalleDTO {
    cantidadFumigacionDetalle: number | null;
    unidadFumigacionDetalle: number | null;
    idAgroquimico: number | null;
}