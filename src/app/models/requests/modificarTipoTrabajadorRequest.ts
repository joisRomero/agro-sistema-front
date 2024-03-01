export interface ModificarTipoTrabajadorRequest {
    idTipoTrabajador: number;
    nombreTipoTrabajador: string | null;
    descripcionTipoTrabajador: string | null;
    usuarioModifica: string | null;
}

