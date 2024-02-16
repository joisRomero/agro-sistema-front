export class ListaPaginadaSociedadesResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginadaSociedadesResponseItem[] = [];
}

export interface ListaPaginadaSociedadesResponseItem {
  idSociedad: number,
  nombre: string,
  numero: number,
  esAdministrador: boolean
}
