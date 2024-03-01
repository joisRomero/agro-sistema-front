
export interface ModificarActividadTrabajadorGastosRequest {
    idActividad: number;
    fechaActividad: string;
    descripcionActividad: string | null;
    idCampania: number;
    idTipoActividad: number;
    usuarioModifica: string | null;
    listaTrabajador: TrabajadorModificarDTO[] | null;
    listaGasto: GastoTrabajadorModificarDTO[] | null;
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