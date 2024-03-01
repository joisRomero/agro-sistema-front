export interface RegistrarTipoActividadRequest {
    nombreTipoActividad: string | null;
    realizadaPorTipoActividad: string | null;
    descripcionTipoActividad: string | null;
    idUsuario: number;
    usuarioInserta: string | null;
}
