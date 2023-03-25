import { GeneralAlertInformationService } from './../../../../../shared/general-alert-information/general-alert-information.service';
import { CultivoService } from 'src/app/services/cultivo.service';
import { lastValueFrom } from 'rxjs';
import { Cultivo } from './../../../../../../models/cultivo';

import { ModalNuevoEditarCultivoService } from './modal-nuevo-editar-cultivo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-nuevo-editar-cultivo',
  templateUrl: './modal-nuevo-editar-cultivo.component.html',
  styleUrls: ['./modal-nuevo-editar-cultivo.component.scss']
})
export class ModalNuevoEditarCultivoComponent implements OnInit {

  @Input() nombreModal: string = '';
  @Input() isEditar: boolean = false;
  @Input() cultivoItem!: Cultivo;
  @Output() elimino = new EventEmitter();

  public tituloModal: string = '';
  public form!: FormGroup;

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: ModalNuevoEditarCultivoService,
    private fb: FormBuilder,
    private cultivoService: CultivoService,
    private alertInformationService: GeneralAlertInformationService
  ) { }


  ngOnInit(): void {
    this.initialControls();
    if(this.isEditar) {
      this.tituloModal = "Editar cultivo";
      this.form.controls["nombre"].setValue(this.cultivoItem.nombre);
      this.form.controls["estado"].setValue(this.cultivoItem.estado);
    } else {
      this.tituloModal = "Nuevo cultivo"
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
      this.alertInformationService.texto = response.body.mensaje;
    }
  }

  private initialControls() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      estado: [true],
      prueba: ["", [Validators.required]]
    });
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    editarCultivo: () => {
      let params: Cultivo = {
        id: this.cultivoItem.id,
        nombre: this.form.controls["nombre"].value,
        estado: this.form.controls["estado"].value
      }
      return lastValueFrom(this.cultivoService.editar(params));
    }
  }

}
