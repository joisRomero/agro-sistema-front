export interface AgregarActividadTrabajadorRequest {
    fechaActividad: string;
    descripcionActividad: string | null;
    idCampania: number;
    idTipoActividad: number;
    usuarioInserta: string | null;
    listaTrabajadores: TrabajadorDTO[] | null;
    listaGastos: GastoDTO[] | null;
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