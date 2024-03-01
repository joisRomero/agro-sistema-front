export class ListaPaginaTipoGastoResponse {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    data: ListaPaginaTipoGastoResponseItem[] = [];
}

export interface ListaPaginaTipoGastoResponseItem{
    numero: number;
    idTipoGasto: number;
    nombreTipoGasto: string | null;
    descripcion: string | null;
}