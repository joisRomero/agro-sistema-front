export interface AgregarCosechaRequest {
    fechaCosecha: string | null;
    idCampania: number;
    descripcion: string | null;
    usuarioInserta: string | null;
    listaCosechaDetalle: CosechaDetalleDTO[] | null;
}

export interface CosechaDetalleDTO {
    cantidad: number;
    unidad: number;
    calidad: number;
    descripcion: string | null;
}