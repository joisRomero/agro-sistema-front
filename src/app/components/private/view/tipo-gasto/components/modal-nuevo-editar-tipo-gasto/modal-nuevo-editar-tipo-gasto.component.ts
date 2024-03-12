import { TipoGastoService } from './../../../../../../services/tipo-gasto.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { AgregarTipoGastoRequest } from 'src/app/models/requests/agregarTipoGastoRequest';
import { EditarTipoGastoRequest } from 'src/app/models/requests/editarTipoGastoRequest';
import { ListaPaginaTipoGastoResponseItem } from 'src/app/models/responses/listaPaginaTipoGastoResponse';
import { Usuario } from 'src/app/models/usuario';
import { ModalNuevoEditarTipoGastoService } from './modal-nuevo-editar-tipo-gasto.service';

@Component({
  selector: 'app-modal-nuevo-editar-tipo-gasto',
  templateUrl: './modal-nuevo-editar-tipo-gasto.component.html',
  styleUrls: ['./modal-nuevo-editar-tipo-gasto.component.scss']
})
export class ModalNuevoEditarTipoGastoComponent implements OnInit {

  @Input() isEditar: boolean = false;
  @Input() tipoGastoItem!: ListaPaginaTipoGastoResponseItem;
  @Output() actualizo = new EventEmitter();

  public tituloModal: string = '';
  public claseBoton: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  constructor(
    public servicioModal: ModalNuevoEditarTipoGastoService,
    private fb: FormBuilder,
    private tipoGastoService: TipoGastoService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.isEditar) {
      this.tituloModal = "Editar tipo de gasto";
      this.form.controls["nombre"].setValue(this.tipoGastoItem.nombreTipoGasto);
      this.form.controls["descripcion"].setValue(this.tipoGastoItem.descripcion);
    } else {
      this.tituloModal = "Nuevo tipo de gasto";
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
      let response = await this.service.editarTipoGasto()
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de gasto";
      this.alertInformationService.texto = "Tipo de gasto editado.";
      this.actualizo.emit();
    } else {
      let response = await this.service.agregarTipoGasto();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Tipo de gasto";
      this.alertInformationService.texto = "Tipo de gasto agregado.";
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
    agregarTipoGasto: () => {
      let params: AgregarTipoGastoRequest = {
        nombreTipoGasto: this.form.controls["nombre"]!.value.trim(),
        descripcion: this.form.controls["descripcion"]!.value.trim(),
        idUsuario: parseInt(this.idUsuario),
        usuarioInserta: this.nombreUsuario,
      }
      return lastValueFrom(this.tipoGastoService.agregarTipoGasto(params));
    },
    editarTipoGasto: () => {
      let params: EditarTipoGastoRequest = {
        idTipoGasto: this.tipoGastoItem.idTipoGasto,
        nombreTipoGasto: this.form.controls["nombre"]!.value.trim(),
        descripcion: this.form.controls["descripcion"]!.value.trim(),
        usuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.tipoGastoService.editarTipoGasto(params));
    }
  }

}
