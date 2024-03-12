import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { ModificarTipoTrabajadorRequest } from 'src/app/models/requests/modificarTipoTrabajadorRequest';
import { RegistrarTipoTrabajadorRequest } from 'src/app/models/requests/registrarTipoTrabajadorRequest';
import { ListaPaginaTipoTrabajadorResponseItem } from 'src/app/models/responses/listaPaginaTipoTrabajadorResponse';
import { Usuario } from 'src/app/models/usuario';
import { TipoTrabajadorService } from 'src/app/services/tipo-trabajador.service';
import { ModalNuevoEditarTrabajadorService } from './modal-nuevo-editar-trabajador.service';

@Component({
  selector: 'app-modal-nuevo-editar-tipo-trabajador',
  templateUrl: './modal-nuevo-editar-tipo-trabajador.component.html',
  styleUrls: ['./modal-nuevo-editar-tipo-trabajador.component.scss']
})
export class ModalNuevoEditarTipoTrabajadorComponent implements OnInit {

  @Input() isEditar: boolean = false;
  @Input() tipoTrabajadorItem!: ListaPaginaTipoTrabajadorResponseItem;
  @Output() actualizo = new EventEmitter();

  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public claseBoton: string = '';
  public form!: FormGroup;
  public tituloModal: string = '';

  constructor(
    public servicioModal: ModalNuevoEditarTrabajadorService,
    private alertInformationService: GeneralAlertInformationVars,
    private fb: FormBuilder,
    private tipoTrabajadorService: TipoTrabajadorService,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.isEditar) {
      this.tituloModal = "Editar tipo de trabajador";
      this.form.controls["nombre"].setValue(this.tipoTrabajadorItem.nombreTipoTrabajador);
      this.form.controls["descripcion"].setValue(this.tipoTrabajadorItem.descripcionTipoTrabajador);
    } else {
      this.tituloModal = "Nuevo tipo de trabajador";
    }
  }

  public mensajesError = {
    nombre: "El campo es obligatorio.",
    descripcion: "El campo es obligatorio."
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if(this.isEditar) {
      let response = await this.service.editarTipoTrabajador()
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de trabajador";
      this.alertInformationService.texto = "Tipo de trabajador editado.";
      this.actualizo.emit();
    } else {
      let response = await this.service.agregarTipoTrabajador();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de trabajador";
      this.alertInformationService.texto = "Tipo de trabajador agregado.";
      this.actualizo.emit()
    }
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      descripcion: [""]
    });
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    agregarTipoTrabajador: () => {

      let params: RegistrarTipoTrabajadorRequest = {
        nombreTipoTrabajador: this.form.controls["nombre"]!.value.trim(),
        descripcionTipoTrabajador: this.form.controls["descripcion"]!.value.trim(),
        idUsuario: parseInt(this.idUsuario),
        usuarioInserta: this.nombreUsuario,
      }
      return lastValueFrom(this.tipoTrabajadorService.registrarTipoTrabajador(params));
    },
    editarTipoTrabajador: () => {
      let params: ModificarTipoTrabajadorRequest = {
        idTipoTrabajador: this.tipoTrabajadorItem.idTipoTrabajador,
        nombreTipoTrabajador: this.form.controls["nombre"]!.value.trim(),
        descripcionTipoTrabajador: this.form.controls["descripcion"]!.value.trim(),
        usuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.tipoTrabajadorService.modificarTipoTrabajador(params));
    }
  }

}
