import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fumigacion } from 'src/app/models/fumigacion';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { Usuario } from 'src/app/models/usuario';
import { NuevoEditarFumigacionVars } from './nuevo-editar-fumigacion-vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { CombosService } from 'src/app/services/combos.service';
import { lastValueFrom } from 'rxjs';
import { ObtenerAgroquimicoUsuarioRequest } from 'src/app/models/requests/obtenerAgroquimicoUsuarioRequest';

@Component({
  selector: 'app-nuevo-editar-fumigacion',
  templateUrl: './nuevo-editar-fumigacion.component.html',
  styleUrls: ['./nuevo-editar-fumigacion.component.scss']
})
export class NuevoEditarFumigacionComponent implements OnInit {

  public form!: FormGroup;
  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  @Output() enviarFumigacion = new EventEmitter<Fumigacion>();
  public tituloModal: string = '';
  public fumigacion!: Fumigacion;
  public valoresAgroquimico: GeneralSelectItem[] = [];
  public valoresUnidadAgrquimico: GeneralSelectItem[] = [];
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  @Input() fumigacionItem!: Fumigacion;

  public mensajesError = {
    general: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal : NuevoEditarFumigacionVars,
    private fb: FormBuilder,
    private alertInformationService: GeneralAlertInformationVars,
    private combosServices: CombosService
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.iniciarCombos();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      tipoAgroquimico: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      unidad: ["", [Validators.required]],
    });

    if(this.isEditar) {
      this.tituloModal = "Editar fumigación";
      this.form.controls["tipoAgroquimico"].setValue(this.fumigacionItem.idAgroquimico);
      this.form.controls["cantidad"].setValue(this.fumigacionItem.cantidad);
      this.form.controls["unidad"].setValue(this.fumigacionItem.unidad);
    } else {
      this.tituloModal = "Agregar fumigación";
    }
  }

  iniciarCombos() {
    (async () => {
      this.valoresAgroquimico = [];
      let response = await this.service.obtenerAgroquimicoUsuario();
      response.body!.forEach(e => {
        this.valoresAgroquimico.push(new GeneralSelectItem(e.idAgroquimico, e.nombreAgroquimico));
      })
    })();
    (async () => {
      this.valoresUnidadAgrquimico = [];
      let response = await this.service.obtenerUnidadFumigacionDetalle();
      response.body!.forEach(e => {
        this.valoresUnidadAgrquimico.push(new GeneralSelectItem(e.codigoUnidadFumigacionDetalle, e.descripcionLarga));
      })
    })();
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let fumigacion: Fumigacion = {
        idFumigacion: this.fumigacion.idFumigacion,
        numero: this.fumigacion.numero,
        idAgroquimico: this.form.controls["tipoAgroquimico"].value,
        cantidad: this.form.controls["cantidad"].value,
        unidad: this.form.controls["unidad"].value,
        descripcionAgroquimico: this.valoresAgroquimico.find( a => (a.value == this.form.controls["tipoAgroquimico"].value))?.text || "",
        unidadDescripcion: this.valoresUnidadAgrquimico.find( a => (a.value == this.form.controls["unidad"].value))?.text || ""
      }
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Abonación";
      this.alertInformationService.texto = "Abonación editada.";
      this.enviarFumigacion.emit(fumigacion);
    } else {
      let fumigacion: Fumigacion = {
        idFumigacion: null,
        numero: 0,
        idAgroquimico: this.form.controls["tipoAgroquimico"].value,
        cantidad: this.form.controls["cantidad"].value,
        unidad: this.form.controls["unidad"].value,
        descripcionAgroquimico: this.valoresAgroquimico.find( a => (a.value == this.form.controls["tipoAgroquimico"].value))?.text || "",
        unidadDescripcion: this.valoresUnidadAgrquimico.find( a => (a.value == this.form.controls["unidad"].value))?.text || ""
      }
      this.enviarFumigacion.emit(fumigacion);
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Abonación";
      this.alertInformationService.texto = "Abonación agregada.";
      this.servicioModal.mostrarModal = false;
    }
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service ={
    obtenerUnidadFumigacionDetalle: () => {
      return lastValueFrom(this.combosServices.obtenerUnidadFumigacionDetalle());
    },
    obtenerAgroquimicoUsuario: () => {
      let params: ObtenerAgroquimicoUsuarioRequest = {
        idUsuario: this.idUsuarioStorage
      }
      return lastValueFrom(this.combosServices.obtenerAgroquimicoUsuario(params));
    },
  }

}
