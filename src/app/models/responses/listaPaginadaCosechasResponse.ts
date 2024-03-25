export class ListaPaginadaCosechasResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginadaCosechasResponseItem[] = [];
}

export interface ListaPaginadaCosechasResponseItem {
  numero : number,
  idCosecha : number,
  fecha : string,
  descripcion : string
}
