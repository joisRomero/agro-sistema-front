export interface listaPaginaAgroquimicoRequest {
    nombre: string | null;
    idTipoAgroquimico: number | null;
    idUsuario: number;
    pageNumber: number;
    pageSize: number;
}
