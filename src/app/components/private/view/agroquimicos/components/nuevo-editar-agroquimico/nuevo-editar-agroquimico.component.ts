import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaPaginaAgroquimicoResponse, ListaPaginaAgroquimicoResponseItem } from 'src/app/models/responses/listaPaginaAgroquimicoResponse';
import { Usuario } from 'src/app/models/usuario';
import { NuevoEditarAgroquimicoVars } from './nuevo-editar-agroquimico-vars';
import { AlertEliminarAgroquimicoVars } from '../alert-eliminar-agroquimico/alert-eliminar-agroquimico-vars';
import { AgroquimicoService } from 'src/app/services/agroquimico.service';
import { Paginacion } from 'src/app/models/paginacion';
import { lastValueFrom } from 'rxjs';
import { listaPaginaAgroquimicoRequest } from 'src/app/models/requests/listaPaginaAgroquimicoRequest';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { EditarAgroquimicoRequest } from 'src/app/models/requests/editarAgroquimicoRequest';
import { AgregarAgroquimico } from 'src/app/models/requests/agregarAgroquimico';
import { CombosService } from 'src/app/services/combos.service';
import { GeneralSelectItem } from 'src/app/models/general-select';

@Component({
  selector: 'app-nuevo-editar-agroquimico',
  templateUrl: './nuevo-editar-agroquimico.component.html',
  styleUrls: ['./nuevo-editar-agroquimico.component.scss']
})
export class NuevoEditarAgroquimicoComponent implements OnInit {
  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  @Input() item!: ListaPaginaAgroquimicoResponseItem;
  public tituloModal: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public valoresTipoAgroquimico: GeneralSelectItem[] = [];
  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoEditarAgroquimicoVars,
    private fb: FormBuilder,
    private abonoService: AgroquimicoService,
    private alertInformationService: GeneralAlertInformationVars,
    private combosService: CombosService
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.iniciarCombos();
    if(this.isEditar) {
      this.tituloModal = "Editar agroquímico";
      this.form.controls["nombre"].setValue(this.item.nombreAgroquimico);
      this.form.controls["tipoAgroquimico"].setValue(this.item.idTipoAgroquimico);
      this.form.controls["descripcion"].setValue(this.item.descripcion);
    } else {
      this.tituloModal = "Nuevo agroquímico";
    }
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["", [Validators.required]],
      tipoAgroquimico: ["", [Validators.required]],
      descripcion: [""]
    });
  }

  iniciarCombos() {
    (async () => {
      this.valoresTipoAgroquimico = [];
      let response = await this.service.obtenerTipoAgroquimico();
      response.body!.forEach(e => {
        this.valoresTipoAgroquimico.push(new GeneralSelectItem(e.id, e.nombre));
      })
    })();
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
      this.alertInformationService.titulo = "Agroquímico";
      this.alertInformationService.texto = "Agroquímico editado.";
      this.actualizo.emit()
    } else {
      let response = await this.service.agregar();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Agroquímico";
      this.alertInformationService.texto = "Agroquímico agregado.";
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
      let params: AgregarAgroquimico = {
        nombreAgroquimico: this.form.controls["nombre"].value.trim(),
        descripcion: this.form.controls["descripcion"].value.trim(),
        idTipoAgroquimico: this.form.controls["tipoAgroquimico"].value,
        idUsuario: parseInt(this.idUsuario),
        usuarioInserta: this.nombreUsuario,
      }
      return lastValueFrom(this.abonoService.agregarAgroquimico(params));
    },
    editar: () => {
      let params: EditarAgroquimicoRequest = {
        idAgroquimico: this.item.idAgroquimico,
        idTipoAgroquimico: this.form.controls["tipoAgroquimico"].value,
        nombreAgroquimico: this.form.controls["nombre"].value.trim(),
        descripcion: this.form.controls["descripcion"].value.trim(),
        usuarioModifica: this.nombreUsuario,
      }
      return lastValueFrom(this.abonoService.editarAgroquimico(params));
    },
    obtenerTipoAgroquimico: () => {
      return lastValueFrom(this.combosService.obtenerTipoAgroquimico());
    }
  }

}
