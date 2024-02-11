export class ObtenerIntegrantesSociedadResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ObtenerIntegrantesSociedadResponseItem[] = [];
}

export interface ObtenerIntegrantesSociedadResponseItem {
  numero: number
  nombreCompleto: string
  idIntegrante: number
  esAdmin: boolean
}
