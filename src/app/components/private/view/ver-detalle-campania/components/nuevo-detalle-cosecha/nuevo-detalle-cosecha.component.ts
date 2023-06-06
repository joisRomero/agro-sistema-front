import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoCosechaVars } from '../nuevo-cosecha/nuevo-cosecha.vars';
import { NuevoDetalleCosechaVars } from './nuevo-detalle-cosecha.vars';
import { CombosService } from 'src/app/services/combos.service';
import { last, lastValueFrom } from 'rxjs';
import { GeneralSelectItem } from 'src/app/models/general-select';

@Component({
  selector: 'app-nuevo-detalle-cosecha',
  templateUrl: './nuevo-detalle-cosecha.component.html',
  styleUrls: ['./nuevo-detalle-cosecha.component.scss']
})
export class NuevoDetalleCosechaComponent implements OnInit {
  @Input() tituloModal: string = 'Agregar detalle cosecha';
  @Input() isEditar: boolean = false;

  public form!: FormGroup;
  public valoresCalidad: GeneralSelectItem[] = []
  public valoresUnidad: GeneralSelectItem[] = []

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoDetalleCosechaVars,
    private fb: FormBuilder,
    private combosServices: CombosService
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.inicarCombos();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      cantidad: ["", [Validators.required]],
      unidad: ["", [Validators.required]],
      calidad: ["", [Validators.required]],
      descripcion: [""]
    })
  }

  private inicarCombos() {
    (async () => {
      this.valoresCalidad = [];
      let response = await this.service.obtenerCalidades();
      response.body!.forEach(el => {
        this.valoresCalidad.push(new GeneralSelectItem(el.codigoCalidadCosecha, el.descripcion))
      })
    })();
    (async () => {
      this.valoresUnidad = [];
      let response = await this.service.obtenerUnidades();
      response.body!.forEach(el => {
        this.valoresUnidad.push(new GeneralSelectItem(el.codigoUnidadCosecha, el.descripcion))
      })
    })();

  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    obtenerCalidades: () => {
      return lastValueFrom(this.combosServices.obtenerCalidadesCosecha());
    },
    obtenerUnidades: () => {
      return lastValueFrom(this.combosServices.obtenerUnidadesCosecha());
    }
  }

}
