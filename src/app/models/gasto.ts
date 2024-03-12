export interface Gasto {
    idGasto: number | null;
    numero: number;
    idTipoGasto: number,
    descripcionTipoGasto: string,
    cantidad: number, 
    costoUnitario: number, 
    costoTotal: number,
    descripcion: string
}