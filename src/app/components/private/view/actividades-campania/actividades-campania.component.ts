import { Component, OnInit } from '@angular/core';
import { NuevoEditarTrabajadorVars } from './components/nuevo-editar-trbajador/nuevo-editar-trabajador-vars';

@Component({
  selector: 'app-actividades-campania',
  templateUrl: './actividades-campania.component.html',
  styleUrls: ['./actividades-campania.component.scss']
})
export class ActividadesCampaniaComponent implements OnInit {

  constructor(
    public nuevoEditarTrabajador: NuevoEditarTrabajadorVars
  ) { }

  ngOnInit(): void {
  }

  public click = {
    nuevo: () => {
      this.nuevoEditarTrabajador.mostrar = true;
    }
  }

}
