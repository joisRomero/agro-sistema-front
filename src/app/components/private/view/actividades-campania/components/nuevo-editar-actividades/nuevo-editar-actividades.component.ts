import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuevo-editar-actividades',
  templateUrl: './nuevo-editar-actividades.component.html',
  styleUrls: ['./nuevo-editar-actividades.component.scss']
})
export class NuevoEditarActividadesComponent implements OnInit {

  public form!: FormGroup;

  public mensajesError = {
    actividad: "El campo es obligatorio.",
    fecha: "El campo es obligatorio.",
  }

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialControls();
  }

  private initialControls() {
    this.form = this.fb.nonNullable.group({
      actividad: [""],
      fecha: [""],
    });
  }

}
