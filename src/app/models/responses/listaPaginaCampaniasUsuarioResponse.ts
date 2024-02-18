export class ListaPaginaCampaniasUsuarioResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginaCampaniasUsuarioResponseItem[] = [];
}

export interface ListaPaginaCampaniasUsuarioResponseItem {
  idCampania : number,
  numero : number,
  nombre : string,
  terreno : string,
  cultivo : string,
  inicio : string,
  fin : string,
  estado : boolean
}
