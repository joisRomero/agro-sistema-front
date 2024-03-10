import { EventEmitter, Injectable } from "@angular/core";
import { Menu } from "src/app/models/menu";

@Injectable({
  providedIn: 'root'
})
export class LayoutVars {
  public vistas: Menu[] = [
    {
      nombre: "Inicio",
      path: "inicio",
      icono: "bi bi-house"
    },
    {
      nombre: "Mis campañas",
      path: "mis-campanias",
      icono: "bi bi-house"
    },
    {
      nombre: "Sociedades",
      path: "sociedades",
      icono: "bi bi-people"
    },
    {
      nombre: "Agroquímicos",
      icono: "bi bi-house",
      menus: [
        {
          nombre: "Agroquímicos",
          path: "agroquimico"
        },
        {
          nombre: "Tipo de agroquímicos",
          path: "tipo-agroquimicos"
        },
        {
          nombre: "Compra de agroquímicos",
          path: "compra-agroquimicos"
        }
      ]
    },
    {
      nombre: "Abonos",
      icono: "bi bi-house",
      menus: [
        {
          nombre: "Abonos",
          path: "abonos"
        },
        {
          nombre: "Compra de abonos",
          path: "compra-abonos"
        }
      ]
    },
    {
      nombre: "Datos",
      icono: "bi bi-house",
      menus: [
        {
          nombre: "Cultivos",
          path: 'cultivos',
        },
        {
          nombre: "Tipo actividad",
          path: 'tipo-actividad',
        },
        {
          nombre: "Tipo trabajador",
          path: 'tipo-trabajador',
        },
        {
          nombre: "Tipo gasto",
          path: 'tipo-gasto',
        },
      ]
    }
  ]
}
