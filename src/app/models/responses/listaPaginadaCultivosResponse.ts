export class ListaPaginadaCultivosResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginadaCultivosResponseItem[] = [];
}

export interface ListaPaginadaCultivosResponseItem {
  correlativo: number,
  idCultivo: number,
  nombreCultivo: string,
  estado: string,
  nombreUsuario: string,
  cantidadRegistros: number
}
