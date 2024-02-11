import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEditarCampaniaSociedadVars } from './nuevo-editar-campania-sociedad-vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { lastValueFrom } from 'rxjs';
import { CombosService } from 'src/app/services/combos.service';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { Usuario } from 'src/app/models/usuario';
import { ObtenerCultivosUsuarioRequest } from 'src/app/models/requests/obtenerCultivosUsuarioRequest';

@Component({
  selector: 'app-modal-nuevo-editar-campania-sociedad',
  templateUrl: './modal-nuevo-editar-campania-sociedad.component.html',
  styleUrls: ['./modal-nuevo-editar-campania-sociedad.component.scss']
})
export class ModalNuevoEditarCampaniaSociedadComponent implements OnInit {

  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  public valoresUnidad: GeneralSelectItem[] = [];
  public valoresCultivos: GeneralSelectItem[] = [];
  private idUsuario: number = parseInt((JSON.parse(sessionStorage.getItem("usuario")!) as Usuario).idUsuario);

  public tituloModal: string = '';
  public form!: FormGroup;
  
  public mensajesError = {
    nombre: "El campo es obligatorio.",
    fechaInicio: "El campo es obligatorio.",
    cultivo: "El campo es obligatorio.",
    nombreTerreno: "El campo es obligatorio.",
    areaSembrar: "El campo es obligatorio.",
    unidad: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoEditarCampaniaSociedadVars,
    private fb: FormBuilder,
    private alertInformationService: GeneralAlertInformationVars,
    private combosServices: CombosService
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.inicarCombos();
    if(this.isEditar) {
      this.tituloModal = "Editar Campaña";
      // this.form.controls["nombre"].setValue(this.sociedadItem.nombre);
    } else {
      this.tituloModal = "Nueva Campaña";
    }
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      fechaInicio: ["", [Validators.required]],
      cultivo: ["", [Validators.required]],
      nombreTerreno: ["", [Validators.required]],
      areaSembrar: ["", [Validators.required]],
      unidad: ["", [Validators.required]],

    });
  }

  public async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      // let response = await this.service.editarSociedad();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Campaña";
      this.alertInformationService.texto = "Campaña editada.";
      this.actualizo.emit()
    } else {
      // let response = await this.service.agregarSociedad();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Campaña";
      this.alertInformationService.texto = "Campaña agregada.";
      this.actualizo.emit()
    }
  }

  private inicarCombos() {
    (async () => {
      this.valoresUnidad = [];
      let response = await this.service.obtenerUnidades();
      response.body!.forEach(el => {
        this.valoresUnidad.push(new GeneralSelectItem(el.codigoUnidadCampania, el.descripcion))
      })
    })();
    (async () => {
      this.valoresUnidad = [];
      let response = await this.service.obtenerCultivos();
      response.body!.forEach(el => {
        this.valoresCultivos.push(new GeneralSelectItem(el.codigoCultivosUsuario, el.descripcion))
      })
    })();
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service = {
    // agregarSociedad: () => {
    //   let params: AgregarSociedadRequest = {
    //     NombreSociedad: this.form.controls["nombre"].value,
    //     IdUsuario: parseInt(this.idUsuario),
    //     UsuarioInserta: this.nombreUsuario,
    //   }
    //   return lastValueFrom(this.sociedadService.agregarSociedad(params));
    // },
    // editarSociedad: () => {
    //   let params: EditarSociedadRequest = {
    //     IdSociedad: this.sociedadItem.idSociedad,
    //     NombreSociedad: this.form.controls["nombre"].value,
    //     UsuarioModifica: this.nombreUsuario,
    //   }
    //   return lastValueFrom(this.sociedadService.editarSociedad(params));
    // }
    obtenerUnidades: () => {
      return lastValueFrom(this.combosServices.obtenerUnidadesCampania());
    },
    obtenerCultivos: () => {
      let params : ObtenerCultivosUsuarioRequest = {
        idUsuario : this.idUsuario
      };
      return lastValueFrom(this.combosServices.obtenerCultivosUsuario(params));
    }
  }

}
