import { EventEmitter, Injectable } from "@angular/core";
import { Menu } from "src/app/models/menu";

@Injectable({
  providedIn: 'root'
})
export class LayoutVars {
  public vistas: Menu[] = [
    {
      codMenu: 1,
      name: "Inicio",
      mostrar: true,
      path: "inicio"
    },
    {
      codMenu: 2,
      name: "Cultivo",
      mostrar: true,
      path: "cultivo"
    },
    {
      codMenu: 3,
      name: "Abono",
      mostrar: true,
      path: "abono"
    }
  ]
  

}
