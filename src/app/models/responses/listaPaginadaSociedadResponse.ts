export class ListaPaginadaSociedadResponse {
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
    data: ListaPaginadaSociedadResponseItem[] = [];
  }
  
  export interface ListaPaginadaSociedadResponseItem {
    correlativo: number,
    idSociedad: number,
    nombreSociedad: string,
    estado: string,
    nombreUsuario: string,
    cantidadRegistros: number
  }
  