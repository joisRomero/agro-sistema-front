import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEditarCampaniaSociedadVars } from './nuevo-editar-campania-sociedad-vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { lastValueFrom } from 'rxjs';
import { CombosService } from 'src/app/services/combos.service';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { Usuario } from 'src/app/models/usuario';
import { ObtenerCultivosUsuarioRequest } from 'src/app/models/requests/obtenerCultivosUsuarioRequest';
import { CampaniaService } from 'src/app/services/campania.service';
import { RegistrarCampaniaRequest } from 'src/app/models/requests/registrarCampaniaRequest';
import { EditarCampaniaRequest } from 'src/app/models/requests/editarCampaniaRequest';
import { ObtenerCampaniaRequest } from 'src/app/models/requests/obtenerCampaniaRequest';
import { Convert } from 'src/app/utils/convert';

@Component({
  selector: 'app-modal-nuevo-editar-campania-sociedad',
  templateUrl: './modal-nuevo-editar-campania-sociedad.component.html',
  styleUrls: ['./modal-nuevo-editar-campania-sociedad.component.scss']
})
export class ModalNuevoEditarCampaniaSociedadComponent implements OnInit {

  @Input() isEditar: boolean = false;
  @Input() idSociendad: string = "";
  @Input() idUsuario: string = "";
  @Input() idCampania!: number;
  @Output() actualizo = new EventEmitter();
  public valoresUnidad: GeneralSelectItem[] = [];
  public valoresCultivos: GeneralSelectItem[] = [];
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public tituloModal: string = '';
  public form!: FormGroup;
  public fechaLimite: string = "";
  
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
    private combosServices: CombosService,
    private campaniaService: CampaniaService
  ) { }

  ngOnInit(): void {
    this.fechaLimite = Convert.dateToDateInput(new Date());
    this.iniciarControles();
    this.inicarCombos();
  }

  private async iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      fechaInicio: ["", [Validators.required]],
      cultivo: ["", [Validators.required]],
      nombreTerreno: ["", [Validators.required]],
      areaSembrar: ["", [Validators.required]],
      unidad: ["", [Validators.required]],
      descripcion: [""],
    });
    if(this.isEditar) {
      this.tituloModal = "Editar Campaña";
      let respnse = await this.service.obtenerCampania();

      this.form.controls["nombreTerreno"].setValue(respnse.body?.nombreTerreno);
      this.form.controls["areaSembrar"].setValue(respnse.body?.areaSembrar);
      this.form.controls["unidad"].setValue(respnse.body?.unidadTerreno);
      this.form.controls["nombre"].setValue(respnse.body?.nombreCampania);
      this.form.controls["descripcion"].setValue(respnse.body?.descripcionCampania);
      this.form.controls["fechaInicio"].setValue(Convert.dateToDateInput(respnse.body!.fechaInicio));
      this.form.controls["cultivo"].setValue(respnse.body?.idCultivo);
    } else {
      this.tituloModal = "Nueva Campaña";
    }
  }

  public async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let response = await this.service.editarCampania();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Campaña";
      this.alertInformationService.texto = "Campaña editada.";
      this.actualizo.emit()
    } else {
      let response = await this.service.registrarCampania();
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
      this.valoresCultivos = [];
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
    registrarCampania: () => {
      let params: RegistrarCampaniaRequest = {
        nombreTerreno: this.form.controls["nombreTerreno"]!.value.trim(),
        areaSembrar : this.form.controls["areaSembrar"].value,
        unidadTerreno : this.form.controls["unidad"].value,
        nombreCampania : this.form.controls["nombre"]!.value.trim(),
        descripcionCampania : this.form.controls["descripcion"]!.value.trim(),
        fechaInicio : this.form.controls["fechaInicio"]!.value.trim(),
        idCultivo : this.form.controls["cultivo"].value, 
        idSociedad : parseInt(this.idSociendad),
        idUsuario : parseInt(this.idUsuario),
        usuarioInserta : this.nombreUsuario,
      }
      return lastValueFrom(this.campaniaService.registrarCampania(params));
    },
    editarCampania: () => {
      let params: EditarCampaniaRequest = {
        idCampania: this.idCampania,
        nombreTerreno: this.form.controls["nombreTerreno"]!.value.trim(),
        areaSembrar : this.form.controls["areaSembrar"].value,
        unidadTerreno : this.form.controls["unidad"].value,
        nombreCampania : this.form.controls["nombre"]!.value.trim(),
        descripcionCampania : this.form.controls["descripcion"]!.value.trim(),
        fechaInicio : this.form.controls["fechaInicio"]!.value.trim(),
        idCultivo : this.form.controls["cultivo"].value, 
        idSociedad : parseInt(this.idSociendad),
        idUsuario : parseInt(this.idUsuario),
        usuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.campaniaService.editarCampania(params));
    },
    obtenerUnidades: () => {
      return lastValueFrom(this.combosServices.obtenerUnidadesCampania());
    },
    obtenerCultivos: () => {
      let params : ObtenerCultivosUsuarioRequest = {
        idUsuario : this.idUsuarioStorage
      };
      return lastValueFrom(this.combosServices.obtenerCultivosUsuario(params));
    },
    obtenerCampania: () => {
      let params: ObtenerCampaniaRequest = {
        idCampania: this.idCampania
      };
      return lastValueFrom(this.campaniaService.obtenerCampania(params));
    }
  }

}
