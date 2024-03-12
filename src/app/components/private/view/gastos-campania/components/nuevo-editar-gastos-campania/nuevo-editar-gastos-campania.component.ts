import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEditarGastosCampaniaVars } from './nuevo-editar-gastos-campania-vars';
import { ObtenerTipoGastoPorUsuarioRequest } from 'src/app/models/requests/obtenerTipoGastoPorUsuarioRequest';
import { lastValueFrom } from 'rxjs';
import { CombosService } from 'src/app/services/combos.service';
import { Usuario } from 'src/app/models/usuario';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { AgregarGastoDetalleRequest } from 'src/app/models/requests/agregarGastoDetalleRequest';
import { GastoDetalleService } from 'src/app/services/gasto-detalle.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { Convert } from 'src/app/utils/convert';
import { ListaPaginaGastoDetalleResponseItem } from 'src/app/models/responses/listaPaginaGastoDetalleResponse';
import { ObtenerGastoDetalleRequest } from 'src/app/models/requests/obtenerGastoDetalleRequest';
import { EditarGastoDetalleRequest } from 'src/app/models/requests/editarGastoDetalleRequest';

@Component({
  selector: 'app-nuevo-editar-gastos-campania',
  templateUrl: './nuevo-editar-gastos-campania.component.html',
  styleUrls: ['./nuevo-editar-gastos-campania.component.scss']
})
export class NuevoEditarGastosCampaniaComponent implements OnInit {

  public form!: FormGroup;
  @Input() isEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  public tituloModal: string = '';
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  private nombreUsuarioStorage: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public valoresTipoGasto: GeneralSelectItem[] = [];
  @Input() idCampania: string = '';
  public fechaLimite: string = "";
  @Input() gastoDetalleItem!: ListaPaginaGastoDetalleResponseItem;

  public mensajesError = {
    tipoGasto: "El campo es obligatorio.",
    cantidad: "El campo es obligatorio.",
    costoUnitario: "El campo es obligatorio.",
    costoTotal: "El campo es obligatorio.",
    descripcion: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoEditarGastosCampaniaVars,
    private fb: FormBuilder,
    private combosServices: CombosService,
    private gastoDetalleServices: GastoDetalleService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.iniciarCombos();
    this.onChange.costoUnitario();
    this.onChange.cantidad();
    this.fechaLimite = Convert.dateToDateInput(new Date());
    
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

  private async iniciarControles() {
    this.form = this.fb.nonNullable.group({
      tipoGasto: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      costoUnitario: ["", [Validators.required]],
      costoTotal: [""],
      descripcion: [""],
      fechaGasto: ["", [Validators.required]],
    });

    if(this.isEditar) {
      this.tituloModal = "Editar gastos";
      let response = await this.service.obtenerGastoDetalle();
      this.form.controls["tipoGasto"].setValue(response.body!.idTipoGasto);
      this.form.controls["cantidad"].setValue(response.body!.cantidad);
      this.form.controls["costoUnitario"].setValue(response.body!.costoUnitario);
      this.form.controls["costoTotal"].setValue(response.body!.costoTotal);
      this.form.controls["descripcion"].setValue(response.body!.descripcion);
      this.form.controls["fechaGasto"].setValue(Convert.dateToDateInput(response.body!.fechaGasto));
    } else {
      this.tituloModal = "Agregar gastos";
      this.form.controls["costoTotal"].setValue(0);
    }
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if (this.isEditar) {
      let response = await this.service.editarGastoDetalle();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Gastos";
      this.alertInformationService.texto = "Gasto editado.";
      this.actualizo.emit()
    } else {
      let response = await this.service.agregarDetalleGasto();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Gastos";
      this.alertInformationService.texto = "Gasto agregado.";
      this.actualizo.emit()
    }
  }

  public onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
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

  private service = {
    obtenerTipoGasto: () => {
      let params: ObtenerTipoGastoPorUsuarioRequest = {
        idUsuario: this.idUsuarioStorage
      }
      return lastValueFrom(this.combosServices.obtenerTipoGastoPorUsuario(params));
    },
    agregarDetalleGasto: () => {
      let params: AgregarGastoDetalleRequest = {
        idCampania: parseInt(this.idCampania),
        idTipoGasto: this.form.controls["tipoGasto"].value,
        fechaGasto: this.form.controls["fechaGasto"].value,
        cantidad: this.form.controls["cantidad"].value,
        costoUnitario: this.form.controls["costoUnitario"].value,
        costoTotal: this.form.controls["costoTotal"].value,
        descripcion: this.form.controls["descripcion"].value,
        usuarioInserta: this.nombreUsuarioStorage,
      }
      return lastValueFrom(this.gastoDetalleServices.agregarGastoDetalle(params));
    },
    obtenerGastoDetalle: () => {
      let params: ObtenerGastoDetalleRequest = {
        idGastoDetalle: this.gastoDetalleItem.idGastoDetalle
      }
      return lastValueFrom(this.gastoDetalleServices.obtenerGastoDetalle(params));
    },
    editarGastoDetalle: () => {
      let params: EditarGastoDetalleRequest = {
        idGastoDetalle: this.gastoDetalleItem.idGastoDetalle,
        idTipoGasto: this.form.controls["tipoGasto"].value,
        fechaGasto: this.form.controls["fechaGasto"].value,
        cantidad: this.form.controls["cantidad"].value,
        costoUnitario: this.form.controls["costoUnitario"].value,
        costoTotal: this.form.controls["costoTotal"].value,
        descripcion: this.form.controls["descripcion"].value,
        usuarioModifica: this.nombreUsuarioStorage,
      }
      return lastValueFrom(this.gastoDetalleServices.editarGastoDetalle(params));
    }
  }

}
