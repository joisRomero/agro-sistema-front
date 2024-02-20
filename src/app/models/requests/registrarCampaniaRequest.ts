export interface RegistrarCampaniaRequest {
    nombreTerreno: string | null;
    areaSembrar: number;
    unidadTerreno: number;
    nombreCampania: string | null;
    descripcionCampania: string | null;
    fechaInicio: string | null;
    idCultivo: number;
    idSociedad: number;
    idUsuario: number;
    usuarioInserta: string | null;
    
}