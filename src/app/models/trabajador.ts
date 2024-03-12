export interface Trabajador {
    idTrabajador: number | null,
    numero: number,
    idTipoTrabajador: number,
    descripcionTipoTrabajador: string,
    cantidad: number, 
    costoUnitario: number, 
    costoTotal: number,
    descripcion: string
}