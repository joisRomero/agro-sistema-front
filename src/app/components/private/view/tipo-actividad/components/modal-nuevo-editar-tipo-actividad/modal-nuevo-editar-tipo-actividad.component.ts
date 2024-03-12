import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaPaginaTipoActividadResponseItem } from 'src/app/models/responses/listaPaginaTipoActividadResponse';
import { Usuario } from 'src/app/models/usuario';
import { ModalNuevoEditarTipoActividadService } from './modal-nuevo-editar-tipo-actividad.service';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { RegistrarTipoActividadRequest } from 'src/app/models/requests/registrarTipoActividadRequest';
import { lastValueFrom } from 'rxjs';
import { ModificarTipoActividadRequest } from 'src/app/models/requests/modificarTipoActividadRequest';
import { GeneralSelectItem } from 'src/app/models/general-select';

@Component({
  selector: 'app-modal-nuevo-editar-tipo-actividad',
  templateUrl: './modal-nuevo-editar-tipo-actividad.component.html',
  styleUrls: ['./modal-nuevo-editar-tipo-actividad.component.scss']
})
export class ModalNuevoEditarTipoActividadComponent implements OnInit {

  @Input() isEditar: boolean = false;
  @Input() tipoActividadItem!: ListaPaginaTipoActividadResponseItem;
  @Output() actualizo = new EventEmitter();

  public tituloModal: string = '';
  public claseBoton: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public valoresRealizadoPor: GeneralSelectItem[] = [];

  public mensajesError = {
    nombre: "El campo es obligatorio.",
    descripcion: "El campo es obligatorio.",
    realizadoPor: "El campo es obligatorio."
  }

  constructor(
    public servicioModal: ModalNuevoEditarTipoActividadService,
    private fb: FormBuilder,
    private tipoActividadService: TipoActividadService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.isEditar) {
      this.form.controls["descripcion"].setValue(this.tipoActividadItem.descripcionTipoActividad);
      this.form.controls["nombre"].setValue(this.tipoActividadItem.nombreTipoActividad);
      this.form.controls["realizadoPor"].setValue(this.tipoActividadItem.realizadaPorTipoActividad?.charAt(0));
      this.tituloModal = "Editar tipo de actividad";
    } else {
      this.tituloModal = "Nuevo tipo de actividad";
    }
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if(this.isEditar) {
      let response = await this.service.editarTipoActividad()
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de actividad";
      this.alertInformationService.texto = "Tipo de actividad editado.";
      this.actualizo.emit();
    } else {
      let response = await this.service.agregarTipoActividad();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de actividad";
      this.alertInformationService.texto = "Tipo de actividad agregado.";
      this.actualizo.emit()
    }
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      descripcion: [""],
      realizadoPor: ["",[Validators.required]]
    });
    this.valoresRealizadoPor.push(new GeneralSelectItem("H","Hombre"));
    this.valoresRealizadoPor.push(new GeneralSelectItem("M","Máquina"));
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    agregarTipoActividad: () => {
      let params: RegistrarTipoActividadRequest = {
        descripcionTipoActividad: this.form.controls["descripcion"]!.value.trim(),
        idUsuario: parseInt(this.idUsuario),
        nombreTipoActividad: this.form.controls["nombre"]!.value.trim(),
        realizadaPorTipoActividad: this.form.controls["realizadoPor"].value,
        usuarioInserta: this.nombreUsuario,
      }
      return lastValueFrom(this.tipoActividadService.registrarTipoActividad(params));
    },
    editarTipoActividad: () => {
      let params: ModificarTipoActividadRequest = {
        descripcionTipoActividad: this.form.controls["descripcion"]!.value.trim(),
        idTipoActividad: this.tipoActividadItem.idTipoActividad,
        nombreTipoActividad: this.form.controls["nombre"]!.value.trim(),
        realizadaPorTipoActividad: this.form.controls["realizadoPor"].value,
        usuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.tipoActividadService.modificarTipoActividad(params));
    }
  }

}
