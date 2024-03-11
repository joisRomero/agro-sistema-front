export interface ListaPaginaAbonoRequest {
    nombre: string | null;
    idUsuario: number;
    pageNumber: number;
    pageSize: number;
}
