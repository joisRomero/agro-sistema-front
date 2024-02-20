import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { NuevoEditarSociedadVars } from './nuevo-editar-sociedad-vars';
import { SociedadService } from 'src/app/services/sociedad.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { AgregarSociedadRequest } from 'src/app/models/requests/agregarSociedadRequest';
import { lastValueFrom } from 'rxjs';
import { EditarSociedadRequest } from 'src/app/models/requests/editarSociedadRequest';
import { ListaPaginadaSociedadesResponseItem } from 'src/app/models/responses/listaPaginadaSociedadesResponse';

@Component({
  selector: 'app-nuevo-editar-sociedad',
  templateUrl: './nuevo-editar-sociedad.component.html',
  styleUrls: ['./nuevo-editar-sociedad.component.scss']
})
export class NuevoEditarSociedadComponent implements OnInit {
  
  @Input() isEditar: boolean = false;
  @Input() sociedadItem!: ListaPaginadaSociedadesResponseItem;
  @Output() actualizo = new EventEmitter();

  public tituloModal: string = '';
  public labelBoton: string = '';
  public claseBoton: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoEditarSociedadVars,
    private fb: FormBuilder,
    private sociedadService: SociedadService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.isEditar) {
      this.tituloModal = "Editar Sociedad";
      this.form.controls["nombre"].setValue(this.sociedadItem.nombre);
    } else {
      this.tituloModal = "Nueva Sociedad";
    }
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let response = await this.service.editarSociedad();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Sociedad";
      this.alertInformationService.texto = "Sociedad Editada.";
      this.actualizo.emit()
    } else {
      let response = await this.service.agregarSociedad();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Sociedad";
      this.alertInformationService.texto = "Sociedad agregada.";
      this.actualizo.emit()
    }

  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
    });
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    agregarSociedad: () => {
      let params: AgregarSociedadRequest = {
        NombreSociedad: this.form.controls["nombre"].value.trim(),
        IdUsuario: parseInt(this.idUsuario),
        UsuarioInserta: this.nombreUsuario,
      }
      return lastValueFrom(this.sociedadService.agregarSociedad(params));
    },
    editarSociedad: () => {
      let params: EditarSociedadRequest = {
        IdSociedad: this.sociedadItem.idSociedad,
        NombreSociedad: this.form.controls["nombre"].value.trim(),
        UsuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.sociedadService.editarSociedad(params));
    }
  }

}
