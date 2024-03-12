import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NuevoEditarAbonoVars } from './nuevo-editar-abono-vars';
import { ListaPaginaAbonoResponseItem } from 'src/app/models/responses/listaPaginaAbonoResponse';
import { Usuario } from 'src/app/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbonoService } from 'src/app/services/abono.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { lastValueFrom } from 'rxjs';
import { AgregarAbono } from 'src/app/models/requests/agregarAbono';
import { EditarAbonoRequest } from 'src/app/models/requests/editarAbonoRequest';

@Component({
  selector: 'app-nuevo-editar-abono',
  templateUrl: './nuevo-editar-abono.component.html',
  styleUrls: ['./nuevo-editar-abono.component.scss']
})
export class NuevoEditarAbonoComponent implements OnInit {

  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  @Input() item!: ListaPaginaAbonoResponseItem;
  public tituloModal: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoEditarAbonoVars,
    private fb: FormBuilder,
    private abonoService: AbonoService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.isEditar) {
      this.tituloModal = "Editar abono";
      this.form.controls["nombre"].setValue(this.item.nombreAbono);
      this.form.controls["descripcion"].setValue(this.item.descripcion);
    } else {
      this.tituloModal = "Nuevo abono";
    }
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      descripcion: [""]
    });
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let response = await this.service.editar();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Abono";
      this.alertInformationService.texto = "Abono editado.";
      this.actualizo.emit()
    } else {
      let response = await this.service.agregar();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Abono";
      this.alertInformationService.texto = "Abono agregado.";
      this.actualizo.emit()
    }

  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    agregar: () => {
      let params: AgregarAbono = {
        nombreAbono: this.form.controls["nombre"]!.value.trim(),
        descripcion: this.form.controls["descripcion"]!.value.trim(),
        idUsuario: parseInt(this.idUsuario),
        usuarioInserta: this.nombreUsuario,
      }
      return lastValueFrom(this.abonoService.agregarAbono(params));
    },
    editar: () => {
      let params: EditarAbonoRequest = {
        idAbono: this.item.idAbono,
        nombreAbono: this.form.controls["nombre"]!.value.trim(),
        descripcion: this.form.controls["descripcion"]!.value.trim(),
        usuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.abonoService.editarAbono(params));
    }
  }

}
