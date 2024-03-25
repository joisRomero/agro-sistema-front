export interface ObtenerCosechaResponse {
    idCosecha: number;
    fechaCosecha: string | null;
    descripcion: string | null;
    idCampania: number | null;
    listaDetalleCosecha: DetalleCosechaDetalleDTO[] | null;
}

export interface DetalleCosechaDetalleDTO {
    idCosechaDetalle: number;
    cantidad: number;
    unidad: number;
    calidad: number;
    descripcion: string | null;
}