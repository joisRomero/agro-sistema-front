export interface EditarCampaniaRequest {
    idCampania: number;
    nombreTerreno: string | null;
    areaSembrar: number;
    unidadTerreno: number;
    nombreCampania: string | null;
    descripcionCampania: string | null;
    fechaInicio: string | null;
    idCultivo: number;
    idSociedad: number | null;
    idUsuario: number | null;
    usuarioModifica: string | null;
}