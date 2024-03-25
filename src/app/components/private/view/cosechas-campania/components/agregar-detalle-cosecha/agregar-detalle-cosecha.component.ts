import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { AgregarDetalleCosechaVars } from './agregar-detalle-cosecha.vars';
import { CombosService } from 'src/app/services/combos.service';
import { lastValueFrom } from 'rxjs';
import { Cosecha } from 'src/app/models/cosecha';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';

@Component({
  selector: 'app-agregar-detalle-cosecha',
  templateUrl: './agregar-detalle-cosecha.component.html',
  styleUrls: ['./agregar-detalle-cosecha.component.scss']
})
export class AgregarDetalleCosechaComponent implements OnInit {

  @Input() tituloModal: string = 'Agregar detalle cosecha';
  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  @Output() enviarCosecha = new EventEmitter<Cosecha>();
  @Input() cosechaItem!: Cosecha;

  public form!: FormGroup;
  public valoresCalidad: GeneralSelectItem[] = []
  public valoresUnidad: GeneralSelectItem[] = []

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: AgregarDetalleCosechaVars,
    private fb: FormBuilder,
    private combosServices: CombosService,
    private alertInformationService: GeneralAlertInformationVars,
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

    if(this.isEditar) {
      this.tituloModal = "Editar detalle cosecha";
      this.form.controls["cantidad"].setValue(this.cosechaItem.cantidad);
      this.form.controls["unidad"].setValue(this.cosechaItem.unidad);
      this.form.controls["calidad"].setValue(this.cosechaItem.calidad);
      this.form.controls["descripcion"].setValue(this.cosechaItem.descripcion);
    } else {
      this.tituloModal = "Agregar detalle cosecha";
    }
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

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let cosecha: Cosecha = {
        idCosecha: this.cosechaItem.idCosecha,
        numero: this.cosechaItem.numero,
        cantidad: this.form.controls["cantidad"].value,
        unidad: this.form.controls["unidad"].value,
        calidad: this.form.controls["calidad"].value,
        descripcion: this.form.controls["descripcion"].value,
        unidadDescripcion: this.valoresUnidad.find( a => (a.value == this.form.controls["unidad"].value))?.text || "",
        calidadDescripcion: this.valoresCalidad.find( a => (a.value == this.form.controls["calidad"].value))?.text || ""
      }
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Detalle cosecha";
      this.alertInformationService.texto = "Detalle cosecha editada.";
      this.enviarCosecha.emit(cosecha);
    } else {
      let cosecha: Cosecha = {
        idCosecha: null,
        numero: 0,
        cantidad: this.form.controls["cantidad"].value,
        unidad: this.form.controls["unidad"].value,
        calidad: this.form.controls["calidad"].value,
        descripcion: this.form.controls["descripcion"].value,
        unidadDescripcion: this.valoresUnidad.find( a => (a.value == this.form.controls["unidad"].value))?.text || "",
        calidadDescripcion: this.valoresCalidad.find( a => (a.value == this.form.controls["calidad"].value))?.text || ""
      }
      this.enviarCosecha.emit(cosecha);
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Detalle cosecha";
      this.alertInformationService.texto = "Detalle cosecha agregada.";
      this.servicioModal.mostrarModal = false;
    }
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
