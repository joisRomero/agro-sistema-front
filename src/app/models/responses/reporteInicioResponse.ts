export interface ReporteInicioResponse {
  campaniasProceso: number;
  campaniasTerminadas: number;
  campaniasReabiertas: number;
  cultivosCampania: CultivosCampania[];
  gastosCultivos: GastosCultivo[];
  campaniasTerminadasTop5: CampaniasTerminadasTop5[];
  ultimasSociedadesUnido: string[];
  campaniasProcesoTop5: CampaniasProcesoTop5[];
}

export interface CultivosCampania {
  cultivo: string;
  cantidad: number;
}

export interface GastosCultivo {
  cultivo: string;
  gasto: number;
}

export interface CampaniasTerminadasTop5 {
  campania: string;
  gasto: number;
}

export interface CampaniasProcesoTop5 {
  campania: string;
  gasto: number;
}
