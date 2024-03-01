import { GeneralAlertInformationVars } from '../../../../../shared/general-alert-information/general-alert-information.vars';
import { CultivoService } from 'src/app/services/cultivo.service';
import { lastValueFrom } from 'rxjs';
import { Cultivo } from './../../../../../../models/cultivo';

import { ModalNuevoEditarCultivoService } from './modal-nuevo-editar-cultivo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgregarCultivoRequest } from 'src/app/models/requests/agregarCultivoRequest';
import { Usuario } from 'src/app/models/usuario';
import { ListaPaginadaCultivosResponseItem } from '../../../../../../models/responses/listaPaginadaCultivosResponse';
import { EditarCultivoRequest } from 'src/app/models/requests/editarCultivoRequest';

@Component({
  selector: 'app-modal-nuevo-editar-cultivo',
  templateUrl: './modal-nuevo-editar-cultivo.component.html',
  styleUrls: ['./modal-nuevo-editar-cultivo.component.scss']
})
export class ModalNuevoEditarCultivoComponent implements OnInit {

  @Input() isEditar: boolean = false;
  @Input() cultivoItem!: ListaPaginadaCultivosResponseItem;
  @Output() actualizo = new EventEmitter();

  public tituloModal: string = '';
  public claseBoton: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: ModalNuevoEditarCultivoService,
    private fb: FormBuilder,
    private cultivoService: CultivoService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.isEditar) {
      this.tituloModal = "Editar cultivo";
      this.form.controls["nombre"].setValue(this.cultivoItem.nombreCultivo);
    } else {
      this.tituloModal = "Nuevo cultivo";
    }
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let response = await this.service.editarCultivo();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Cultivo";
      this.alertInformationService.texto = "Cultivo editado.";
      this.actualizo.emit()
    } else {
      let response = await this.service.agregarCultivo();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Cultivo";
      this.alertInformationService.texto = "Cultivo agregado.";
      this.actualizo.emit()
    }

  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      /*estado: [true],
      prueba: ["", [Validators.required]]*/
    });
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    agregarCultivo: () => {
      let params: AgregarCultivoRequest = {
        NombreCultivo: this.form.controls["nombre"].value.trim(),
        IdUsuario: parseInt(this.idUsuario),
        UsuarioInserta: this.nombreUsuario,
      }
      return lastValueFrom(this.cultivoService.agregarCultivo(params));
    },
    editarCultivo: () => {
      let params: EditarCultivoRequest = {
        IdCultivo: this.cultivoItem.idCultivo,
        NombreCultivo: this.form.controls["nombre"].value.trim(),
        IdUsuario: parseInt(this.idUsuario),
        UsuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.cultivoService.editarCultivo(params));
    }
  }

}
