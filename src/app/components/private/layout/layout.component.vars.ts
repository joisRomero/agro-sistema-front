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
      icono: "bi bi-house-fill"
    },
    {
      nombre: "Campañas",
      path: "campanias",
      icono: "bi bi-house-fill"
    },
    {
      nombre: "Sociedades",
      path: "sociedades",
      icono: "bi bi-people-fill"
    },
    {
      nombre: "Agroquímicos",
      icono: "bi bi-house-fill",
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
      icono: "bi bi-house-fill",
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
      icono: "bi bi-house-fill",
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
      ]
    }
  ]
}
