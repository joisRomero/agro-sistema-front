import { Component, OnInit } from '@angular/core';
import { ModalNuevoEditarTipoActividadService } from './components/modal-nuevo-editar-tipo-actividad/modal-nuevo-editar-tipo-actividad.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ListaPaginaTipoActividadResponse, ListaPaginaTipoActividadResponseItem } from 'src/app/models/responses/listaPaginaTipoActividadResponse';
import { ListaPaginaTipoActividadRequest } from 'src/app/models/requests/listaPaginaTipoActividadRequest';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import { Paginacion } from 'src/app/models/paginacion';
import { lastValueFrom } from 'rxjs';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { AlertEliminarTipoActividadService } from './components/alert-eliminar-tipo-actividad/alert-eliminar-tipo-actividad.service';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.scss']
})
export class TipoActividadComponent implements OnInit {

  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public form!: FormGroup;
  public idTipoActividad!: number;
  public isEditar: boolean = false;
  public itemsTabla: ListaPaginaTipoActividadResponse = new ListaPaginaTipoActividadResponse();
  public listaTipoActividades!: ListaPaginaTipoActividadRequest;
  public nombre: string = '';
  public tipoActividadItem!: ListaPaginaTipoActividadResponseItem;
  public verMensajeSinDatos: boolean = false;
  public valoresRealizadoPor: GeneralSelectItem[] = [];

  constructor(
    public alertEliminarService: AlertEliminarTipoActividadService,
    public fb: FormBuilder,
    public modalNuevoEditarTipoActividadService: ModalNuevoEditarTipoActividadService,
    public tipoActividadService: TipoActividadService,
  ) { }

  ngOnInit(): void {
    this.initialControls();
    this.setDatosBusqueda();
    this.buscar();
  }

  private initialControls() {
    this.form = this.fb.nonNullable.group({
      nombre: [""],
      realizadoPor: [""]
    });
    this.valoresRealizadoPor.push(new GeneralSelectItem("H","Hombre"));
    this.valoresRealizadoPor.push(new GeneralSelectItem("M","Máquina"));
  }

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaTipoActividades.pageNumber = paginaActual;
      this.buscar();
    }
  }

  private async buscar() {
    this.itemsTabla = new ListaPaginaTipoActividadResponse();
    let response = await this.service.obtenerListaTipoActividades();
    this.itemsTabla = response.body!;

    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  setDatosBusqueda() {
    this.listaTipoActividades = {
      nombreTipoActividad: this.form.controls["nombre"]!.value.trim(),
      idUsuario: parseInt(this.idUsuario),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10,
      realizadaPorTipoActividad: this.form.controls["realizadoPor"].value,
    }
  }

  private service = {
    obtenerListaTipoActividades: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.tipoActividadService.obtenerListaPaginadaTipoActividad(this.listaTipoActividades));
    }
  }

  public onClick = {
    nuevoTipoActividad: () => {
      this.isEditar = false;
      this.nombre = 'nuevo';
      this.modalNuevoEditarTipoActividadService.mostrarModal = true;
    },
    editarTipoActividad: async (editItem: ListaPaginaTipoActividadResponseItem) => {
      this.tipoActividadItem = editItem;
      this.isEditar = true;
      this.nombre = 'editar';
      this.modalNuevoEditarTipoActividadService.mostrarModal = true;
    },
    eliminarTipoActividad: async (idTipoActividad: number) => {
      this.idTipoActividad = idTipoActividad;
      this.alertEliminarService.mostrar = true;
    },
    buscar: () => {
      this.buscar();
    },
    limpiar: () => {
      this.form.controls["nombre"].setValue("");
      this.form.controls["realizadoPor"].setValue("")
    },
  }

  public actualizarTabla() {
    this.buscar();
  }

}
