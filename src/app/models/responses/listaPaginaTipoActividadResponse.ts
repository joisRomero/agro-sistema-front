export class ListaPaginaTipoActividadResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginaTipoActividadResponseItem[] = [];
}

export interface ListaPaginaTipoActividadResponseItem {
    correlativo: number;
    idTipoActividad: number;
    nombreTipoActividad: string | null;
    realizadaPorTipoActividad: string | null;
    descripcionTipoActividad: string | null;
}
