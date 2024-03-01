export class ListaPaginaGastoDetalleResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginaGastoDetalleResponseItem[] = [];
}

export interface ListaPaginaGastoDetalleResponseItem {
    numero: number;
    idGastoDetalle: number;
    idTipoGasto: number;
    nombreTipoGasto: string | null;
    fechaGasto: string;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
    descripcion: string | null;
}
