import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEditarGastosVars } from './nuevo-editar-gastos-vars';
import { ObtenerTipoGastoPorUsuarioRequest } from 'src/app/models/requests/obtenerTipoGastoPorUsuarioRequest';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { CombosService } from 'src/app/services/combos.service';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { Gasto } from 'src/app/models/gasto';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';

@Component({
  selector: 'app-nuevo-editar-gastos',
  templateUrl: './nuevo-editar-gastos.component.html',
  styleUrls: ['./nuevo-editar-gastos.component.scss']
})
export class NuevoEditarGastosComponent implements OnInit {

  public form!: FormGroup;
  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  public tituloModal: string = '';
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  public valoresTipoGasto: GeneralSelectItem[] = [];
  @Output() enviarGasto = new EventEmitter<Gasto>();
  @Input() gastoItem!: Gasto;


  public mensajesError = {
    tipoGasto: "El campo es obligatorio.",
    cantidad: "El campo es obligatorio.",
    costoUnitario: "El campo es obligatorio.",
    costoTotal: "El campo es obligatorio.",
    descripcion: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoEditarGastosVars,
    private fb: FormBuilder,
    private combosServices: CombosService,
    private alertInformationService: GeneralAlertInformationVars,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.iniciarCombos();
    this.onChange.costoUnitario();
    this.onChange.cantidad();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      tipoGasto: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      costoUnitario: ["", [Validators.required]],
      costoTotal: [""],
      descripcion: [""],
    });

    if(this.isEditar) {
      this.tituloModal = "Editar información de gastos";
      console.log(this.gastoItem)
      this.form.controls["tipoGasto"].setValue(this.gastoItem.idTipoGasto);
      this.form.controls["cantidad"].setValue(this.gastoItem.cantidad);
      this.form.controls["costoTotal"].setValue(this.gastoItem.costoTotal);
      this.form.controls["costoUnitario"].setValue(this.gastoItem.costoUnitario);
      this.form.controls["descripcion"].setValue(this.gastoItem.descripcion);
    } else {
      this.tituloModal = "Agregar información de gastos";
      this.form.controls["costoTotal"].setValue(0);
    }
  }

  iniciarCombos() {
    (async () => {
      this.valoresTipoGasto = [];
      let response = await this.service.obtenerTipoGasto();
      response.body!.forEach(e => {
        this.valoresTipoGasto.push(new GeneralSelectItem(e.idTipoGasto, e.nombreTipoGasto));
      })
    })();
  }

  public calcularTotal() {
    let resultado = parseFloat(this.form.controls["costoUnitario"].value || "0") * parseFloat(this.form.controls["cantidad"].value || "0")
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
      let gasto: Gasto = {
        idGasto: this.gastoItem.idGasto,
        numero: this.gastoItem.numero,
        idTipoGasto: this.form.controls["tipoGasto"].value,
        cantidad: this.form.controls["cantidad"].value,
        costoTotal: this.form.controls["costoTotal"].value,
        costoUnitario: this.form.controls["costoUnitario"].value,
        descripcion: this.form.controls["descripcion"].value,
        descripcionTipoGasto: this.valoresTipoGasto.find( a => (a.value == this.form.controls["tipoGasto"].value))?.text || ""
      }
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Información de gastos";
      this.alertInformationService.texto = "Información de gastos editada.";
      this.enviarGasto.emit(gasto);
    } else {
      this.servicioModal.mostrarModal = false;
      let gasto: Gasto = {
        idGasto: null,
        numero: 0,
        idTipoGasto: this.form.controls["tipoGasto"].value,
        cantidad: this.form.controls["cantidad"].value,
        costoTotal: this.form.controls["costoTotal"].value,
        costoUnitario: this.form.controls["costoUnitario"].value,
        descripcion: this.form.controls["descripcion"].value,
        descripcionTipoGasto: this.valoresTipoGasto.find( a => (a.value == this.form.controls["tipoGasto"].value))?.text || ""
      }
      this.enviarGasto.emit(gasto);
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Información de gastos";
      this.alertInformationService.texto = "Información de gastos agregada.";
      this.servicioModal.mostrarModal = false;
    }
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }

  private service ={
    obtenerTipoGasto: () => {
      let params: ObtenerTipoGastoPorUsuarioRequest = {
        idUsuario: this.idUsuarioStorage
      }
      return lastValueFrom(this.combosServices.obtenerTipoGastoPorUsuario(params));
    },
  }

}
