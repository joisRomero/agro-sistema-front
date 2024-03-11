export class ListaPaginaAgroquimicoResponse {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    data: ListaPaginaAgroquimicoResponseItem[] = []; 
}

export interface ListaPaginaAgroquimicoResponseItem {
    numero: number;
    idAgroquimico: number;
    nombreAgroquimico: string | null;
    idTipoAgroquimico: number;
    nombreTipoAgroquimico: string | null;
    descripcion: string | null;
}
