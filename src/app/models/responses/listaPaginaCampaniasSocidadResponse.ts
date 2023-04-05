export class ListaPaginaCampaniasSocidadResponse {
  pageNumber?: number;
  pageSize?: number;
  totalRows?: number;
  data: ListaPaginaCampaniasSocidadResponseItem[] = [];
}

export interface ListaPaginaCampaniasSocidadResponseItem {
  idCampania : number,
  numero : number,
  nombre : string,
  terreno : string,
  cultivo : string,
  inicio : string,
  fin : string,
  estado : boolean
}
