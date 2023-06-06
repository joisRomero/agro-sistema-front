import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoCosechaVars } from './nuevo-cosecha.vars';

@Component({
  selector: 'app-nuevo-cosecha',
  templateUrl: './nuevo-cosecha.component.html',
  styleUrls: ['./nuevo-cosecha.component.scss']
})
export class NuevoCosechaComponent implements OnInit {
  @Input() esEditar: boolean = false;

  public tituloModal: string = 'Agregar cosecha';
  public form!: FormGroup;

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoCosechaVars,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.esEditar) {
      this.tituloModal = "Editar cosecha"
    } else {
      this.tituloModal = "Agregar cosecha"
    }
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      fecha: ["", [Validators.required]],
      descripcion: [""]
    })
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }
}
