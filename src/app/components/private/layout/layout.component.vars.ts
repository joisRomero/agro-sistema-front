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
      icono: "bi bi-ui-radios-grid"
    },
    {
      nombre: "Sociedades",
      path: "sociedades",
      icono: "bi bi-people"
    },
    {
      nombre: "Agroquímicos",
      icono: "bi bi-archive",
      path: "agroquimico"

      // menus: [
      //   {
      //     nombre: "Agroquímicos",
      //     path: "agroquimico"
      //   },
      //   // {
      //   //   nombre: "Tipo de agroquímicos",
      //   //   path: "tipo-agroquimicos"
      //   // },
      //   // {
      //   //   nombre: "Compra de agroquímicos",
      //   //   path: "compra-agroquimicos"
      //   // }
      // ]
    },
    {
      nombre: "Abonos",
      icono: "bi bi-bag",
      path: "abonos"
      // menus: [
      //   {
      //     nombre: "Abonos",
      //     path: "abonos"
      //   },
      //   // {
      //   //   nombre: "Compra de abonos",
      //   //   path: "compra-abonos"
      //   // }
      // ]
    },
    {
      nombre: "Datos",
      icono: "bi bi-database",
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
