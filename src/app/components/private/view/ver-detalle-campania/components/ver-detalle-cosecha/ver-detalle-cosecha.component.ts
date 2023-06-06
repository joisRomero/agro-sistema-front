import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerDetalleCosechaVars } from './ver-detalle-cosecha.vars';

@Component({
  selector: 'app-ver-detalle-cosecha',
  templateUrl: './ver-detalle-cosecha.component.html',
  styleUrls: ['./ver-detalle-cosecha.component.scss']
})
export class VerDetalleCosechaComponent implements OnInit {

  public tituloModal: string = 'Detalle cosecha';
  public form!: FormGroup;

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: VerDetalleCosechaVars,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({

    })
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

}
