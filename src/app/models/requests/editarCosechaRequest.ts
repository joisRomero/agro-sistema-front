export interface EditarCosechaRequest {
    idCosecha: number | null;
    fechaCosecha: string | null;
    idCampania: number;
    descripcion: string | null;
    usuarioModifica: string | null;
    listaCosechaDetalle: CosechaDetalleEditarRequestDTO[] | null;
}

export interface CosechaDetalleEditarRequestDTO {
    idCosechaDetalle: number | null;
    cantidad: number;
    unidad: number;
    calidad: number;
    descripcion: string | null;
}