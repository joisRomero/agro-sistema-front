import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NuevoEditarTrabajadorVars } from './nuevo-editar-trabajador-vars';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trabajador } from 'src/app/models/trabajador';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { lastValueFrom } from 'rxjs';
import { ObtenerTipoTrabajadorPorUsuarioRequest } from 'src/app/models/requests/obtenerTipoTrabajadorPorUsuarioRequest';
import { Usuario } from 'src/app/models/usuario';
import { CombosService } from 'src/app/services/combos.service';

@Component({
  selector: 'app-nuevo-editar-trbajador',
  templateUrl: './nuevo-editar-trbajador.component.html',
  styleUrls: ['./nuevo-editar-trbajador.component.scss']
})
export class NuevoEditarTrbajadorComponent implements OnInit {

  public form!: FormGroup;
  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  @Output() enviarTrabajador = new EventEmitter<Trabajador>();
  public tituloModal: string = '';
  public trabajador!: Trabajador;
  public valoresTipoTrabajador: GeneralSelectItem[] = [];
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  @Input() trabajadorItem!: Trabajador;

  public mensajesError = {
    tipoTrabajador: "El campo es obligatorio.",
    cantidad: "El campo es obligatorio.",
    costoUnitario: "El campo es obligatorio.",
    costoTotal: "El campo es obligatorio.",
    descripcion: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal : NuevoEditarTrabajadorVars,
    private fb: FormBuilder,
    private alertInformationService: GeneralAlertInformationVars,
    private combosServices: CombosService
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.iniciarCombos();
    this.onChange.costoUnitario();
    this.onChange.cantidad();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      tipoTrabajador: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      costoUnitario: ["", [Validators.required]],
      costoTotal: [""],
      descripcion: [""],
    });

    if(this.isEditar) {
      this.tituloModal = "Editar información de trabajadores";
      this.form.controls["tipoTrabajador"].setValue(this.trabajadorItem.idTipoTrabajador);
      this.form.controls["cantidad"].setValue(this.trabajadorItem.cantidad);
      this.form.controls["costoTotal"].setValue(this.trabajadorItem.costoTotal);
      this.form.controls["costoUnitario"].setValue(this.trabajadorItem.costoUnitario);
      this.form.controls["descripcion"].setValue(this.trabajadorItem.descripcion);
    } else {
      this.tituloModal = "Agregar información de trabajadores";
      this.form.controls["costoTotal"].setValue(0);
    }
  }

  iniciarCombos() {
    (async () => {
      this.valoresTipoTrabajador = [];
      let response = await this.service.obtenerTipoTrabajadorPorUsuario();
      response.body!.forEach(e => {
        this.valoresTipoTrabajador.push(new GeneralSelectItem(e.idTipoTrabajador, e.nombreTipoTrabajador));
      })
    })();
  }

  public calcularTotal() {
    let resultado = parseInt(this.form.controls["costoUnitario"].value || "0") * parseInt(this.form.controls["cantidad"].value || "0")
    this.form.controls["costoTotal"].setValue(resultado)
  }

  public onChange = {
    costoUnitario: () => {
      this.form.controls["costoUnitario"].valueChanges.subscribe(
        () => {
          this.calcularTotal()
        }
      );
    },
    cantidad: () => {
      this.form.controls["cantidad"].valueChanges.subscribe(
        () => {
          this.calcularTotal()
        }
      );
    }
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let trabajador: Trabajador = {
        idTrabajador: this.trabajadorItem.idTrabajador,
        numero: this.trabajadorItem.numero,
        idTipoTrabajador: this.form.controls["tipoTrabajador"].value,
        cantidad: this.form.controls["cantidad"].value,
        costoTotal: this.form.controls["costoTotal"].value,
        costoUnitario: this.form.controls["costoUnitario"].value,
        descripcion: this.form.controls["descripcion"].value,
        descripcionTipoTrabajador: this.valoresTipoTrabajador.find( a => (a.value == this.form.controls["tipoTrabajador"].value))?.text || ""
      }
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Información de trabajadores";
      this.alertInformationService.texto = "Información de trabajadores editada.";
      this.enviarTrabajador.emit(trabajador);
    } else {
      let trabajador: Trabajador = {
        idTrabajador: null,
        numero: 0,
        idTipoTrabajador: this.form.controls["tipoTrabajador"].value,
        cantidad: this.form.controls["cantidad"].value,
        costoTotal: this.form.controls["costoTotal"].value,
        costoUnitario: this.form.controls["costoUnitario"].value,
        descripcion: this.form.controls["descripcion"].value,
        descripcionTipoTrabajador: this.valoresTipoTrabajador.find( a => (a.value == this.form.controls["tipoTrabajador"].value))?.text || ""
      }
      this.enviarTrabajador.emit(trabajador);
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Información de trabajadores";
      this.alertInformationService.texto = "Información de trabajadores agregada.";
      this.servicioModal.mostrarModal = false;
    }
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service ={
    obtenerTipoTrabajadorPorUsuario: () => {
      let params: ObtenerTipoTrabajadorPorUsuarioRequest = {
        idUsuario: this.idUsuarioStorage
      }
      return lastValueFrom(this.combosServices.obtenerTipoTrabajadorPorUsuario(params));
    },
  }

}
