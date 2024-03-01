export interface ModificarTipoActividadRequest {
    idTipoActividad: number;
    nombreTipoActividad: string | null;
    realizadaPorTipoActividad: string | null;
    descripcionTipoActividad: string | null;
    usuarioModifica: string | null;
}
