import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaTipoGastoRequest } from 'src/app/models/requests/listaPaginaTipoGastoRequest';
import { ListaPaginaTipoGastoResponse, ListaPaginaTipoGastoResponseItem } from 'src/app/models/responses/listaPaginaTipoGastoResponse';
import { TipoGastoService } from '../../../../services/tipo-gasto.service';
import { Usuario } from 'src/app/models/usuario';
import { lastValueFrom } from 'rxjs';
import { ModalNuevoEditarTipoGastoService } from './components/modal-nuevo-editar-tipo-gasto/modal-nuevo-editar-tipo-gasto.service';
import { AlertEliminarTipoGastoService } from './components/alert-eliminar-tipo-gasto/alert-eliminar-tipo-gasto.service';

@Component({
  selector: 'app-tipo-gasto',
  templateUrl: './tipo-gasto.component.html',
  styleUrls: ['./tipo-gasto.component.scss']
})
export class TipoGastoComponent implements OnInit {

  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public form!: FormGroup;
  public idTipoGasto!: number;
  public isEditar: boolean = false;
  public itemsTabla: ListaPaginaTipoGastoResponse = new ListaPaginaTipoGastoResponse();
  public listaTipoGastos!: ListaPaginaTipoGastoRequest;
  public nombre: string = '';
  public tipoGastoItem!: ListaPaginaTipoGastoResponseItem;
  public verMensajeSinDatos: boolean = false;


  constructor(
    public alertEliminarService: AlertEliminarTipoGastoService,
    public fb: FormBuilder,
    public modalNuevoEditarTipoGastoService: ModalNuevoEditarTipoGastoService,
    public tipoGastoService: TipoGastoService,
  ) { }

  ngOnInit(): void {
    this.initialControls();
    this.setDatosBusqueda();
    this.buscar();
  }

  private initialControls() {
    this.form = this.fb.nonNullable.group({
      nombre: [""]
    })
  }

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaTipoGastos.pageNumber = paginaActual;
      this.buscar();
    }
  }

  private async buscar() {
    this.itemsTabla = new ListaPaginaTipoGastoResponse();
    let response = await this.service.obtenerListaTipoGastos();
    this.itemsTabla = response.body!;

    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  setDatosBusqueda() {
    this.listaTipoGastos = {
      nombre: this.form.controls["nombre"]!.value.trim(),
      idUsuario: parseInt(this.idUsuario),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10
    }
  }

  private service = {
    obtenerListaTipoGastos: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.tipoGastoService.obtenerListaPaginadaTipoGasto(this.listaTipoGastos));
    }
  }

  public onClick = {
    nuevoTipoGasto: () => {
      this.isEditar = false;
      this.nombre = 'nuevo';
      this.modalNuevoEditarTipoGastoService.mostrarModal = true;
    },
    editarTipoGasto: async (editItem: ListaPaginaTipoGastoResponseItem) => {
      this.tipoGastoItem = editItem;
      this.isEditar = true;
      this.nombre = 'editar';
      this.modalNuevoEditarTipoGastoService.mostrarModal = true;
    },
    eliminarTipoGasto: async (idTipoGasto: number) => {
      this.idTipoGasto = idTipoGasto;
      this.alertEliminarService.mostrar = true;
    },
    buscar: () => {
      this.buscar();
    },
    limpiar: () => {
      this.form.controls["nombre"].setValue("");
    },
  }

  public actualizarTabla() {
    this.buscar();
  }

}
