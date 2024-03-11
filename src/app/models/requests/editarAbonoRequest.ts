export interface EditarAbonoRequest {
    idAbono: number;
    nombreAbono: string | null;
    descripcion: string | null;
    usuarioModifica: string | null;
}

