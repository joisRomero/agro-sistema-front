export interface EditarTipoGastoRequest {
    idTipoGasto: number;
    nombreTipoGasto: string | null;
    descripcion: string | null;
    usuarioModifica: string | null;
}
