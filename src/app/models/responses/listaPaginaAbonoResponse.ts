export class ListaPaginaAbonoResponse {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    data: ListaPaginaAbonoResponseItem[] = [];  
}

export interface ListaPaginaAbonoResponseItem {
    numero: number;
    idAbono: number;
    nombreAbono: string | null;
    descripcion: string | null;
}
