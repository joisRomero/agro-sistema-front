export interface EditarAgroquimicoRequest {
    idAgroquimico: number;
    nombreAgroquimico: string | null;
    idTipoAgroquimico: number;
    descripcion: string | null;
    usuarioModifica: string | null;
}
