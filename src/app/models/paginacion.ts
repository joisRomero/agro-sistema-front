export interface Paginacion {
  totalFilas: number,
	totalPaginas: number,
	paginaActual: number,
  onChangePage: (event:any) => void,
}
