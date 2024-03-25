import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Abono } from 'src/app/models/abono';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { Usuario } from 'src/app/models/usuario';
import { NuevoEditarAbonacionVars } from './nuevo-editar-abonacion-vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { CombosService } from 'src/app/services/combos.service';
import { lastValueFrom } from 'rxjs';
import { ObtenerAbonoUsuarioRequest } from 'src/app/models/requests/obtenerAbonoUsuarioRequest';

@Component({
  selector: 'app-agregar-editar-abonacion',
  templateUrl: './agregar-editar-abonacion.component.html',
  styleUrls: ['./agregar-editar-abonacion.component.scss']
})
export class AgregarEditarAbonacionComponent implements OnInit {

  public form!: FormGroup;
  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  @Output() enviarAbono = new EventEmitter<Abono>();
  public tituloModal: string = '';
  public abono!: Abono;
  public valoresTipoAbono: GeneralSelectItem[] = [];
  public valoresUnidadTipoAbono: GeneralSelectItem[] = [];
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  @Input() abonoItem!: Abono;

  public mensajesError = {
    general: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal : NuevoEditarAbonacionVars,
    private fb: FormBuilder,
    private alertInformationService: GeneralAlertInformationVars,
    private combosServices: CombosService
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.iniciarCombos();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      tipoAbono: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      unidad: ["", [Validators.required]],
    });

    if(this.isEditar) {
      this.tituloModal = "Editar abonación";
      this.form.controls["tipoAbono"].setValue(this.abonoItem.idTipoAbono);
      this.form.controls["cantidad"].setValue(this.abonoItem.cantidad);
      this.form.controls["unidad"].setValue(this.abonoItem.unidad);
    } else {
      this.tituloModal = "Agregar abonación";
    }
  }

  iniciarCombos() {
    (async () => {
      this.valoresTipoAbono = [];
      let response = await this.service.obtenerAbonoUsuario();
      response.body!.forEach(e => {
        this.valoresTipoAbono.push(new GeneralSelectItem(e.idAbono, e.nombreAbono));
      })
    })();
    (async () => {
      this.valoresUnidadTipoAbono = [];
      let response = await this.service.obtenerUnidadAbonacion();
      response.body!.forEach(e => {
        this.valoresUnidadTipoAbono.push(new GeneralSelectItem(e.codigoUnidadAbonacion, e.descripcionLarga));
      })
    })();
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let abono: Abono = {
        idAbono: this.abonoItem.idAbono,
        numero: this.abonoItem.numero,
        idTipoAbono: this.form.controls["tipoAbono"].value,
        cantidad: this.form.controls["cantidad"].value,
        unidad: this.form.controls["unidad"].value,
        descripcionTipoAbono: this.valoresTipoAbono.find( a => (a.value == this.form.controls["tipoAbono"].value))?.text || "",
        unidadDescripcion: this.valoresUnidadTipoAbono.find( a => (a.value == this.form.controls["unidad"].value))?.text || ""
      }
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Abonación";
      this.alertInformationService.texto = "Abonación editada.";
      this.enviarAbono.emit(abono);
    } else {
      let abono: Abono = {
        idAbono: null,
        numero: 0,
        idTipoAbono: this.form.controls["tipoAbono"].value,
        cantidad: this.form.controls["cantidad"].value,
        unidad: this.form.controls["unidad"].value,
        descripcionTipoAbono: this.valoresTipoAbono.find( a => (a.value == this.form.controls["tipoAbono"].value))?.text || "",
        unidadDescripcion: this.valoresUnidadTipoAbono.find( a => (a.value == this.form.controls["unidad"].value))?.text || ""
      }
      this.enviarAbono.emit(abono);
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Abonación";
      this.alertInformationService.texto = "Abonación agregada.";
      this.servicioModal.mostrarModal = false;
    }
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service ={
    obtenerUnidadAbonacion: () => {
      return lastValueFrom(this.combosServices.obtenerUnidadAbonacion());
    },
    obtenerAbonoUsuario: () => {
      let params: ObtenerAbonoUsuarioRequest = {
        idUsuario: this.idUsuarioStorage
      }
      return lastValueFrom(this.combosServices.obtenerAbonoUsuario(params));
    },
    
  }

}
