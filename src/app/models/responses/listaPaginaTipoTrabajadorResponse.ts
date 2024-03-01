export class ListaPaginaTipoTrabajadorResponse {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    data: ListaPaginaTipoTrabajadorResponseItem[] = [];
}

export interface ListaPaginaTipoTrabajadorResponseItem {
    correlativo: number;
    idTipoTrabajador: number;
    nombreTipoTrabajador: string | null;
    descripcionTipoTrabajador: string | null;
}
