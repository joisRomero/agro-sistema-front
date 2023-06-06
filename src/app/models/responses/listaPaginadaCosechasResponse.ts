export class ListaPaginadaCosechasResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginadaCosechasResponseItem[] = [];
}

export interface ListaPaginadaCosechasResponseItem {
  idCosecha : number,
  numero : number,
  fecha : string,
  descripcion : string
}
