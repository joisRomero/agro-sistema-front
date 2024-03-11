import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaTipoTrabajadorRequest } from 'src/app/models/requests/listaPaginaTipoTrabajadorRequest';
import { ListaPaginaTipoTrabajadorResponse, ListaPaginaTipoTrabajadorResponseItem } from 'src/app/models/responses/listaPaginaTipoTrabajadorResponse';
import { Usuario } from 'src/app/models/usuario';
import { TipoTrabajadorService } from 'src/app/services/tipo-trabajador.service';
import { ModalNuevoEditarTrabajadorService } from './components/modal-nuevo-editar-tipo-trabajador/modal-nuevo-editar-trabajador.service';
import { AlertEliminarTipoTrabajadorService } from './components/alert-eliminar-tipo-trabajador/alert-eliminar-tipo-trabajador.service';

@Component({
  selector: 'app-tipo-trabajador',
  templateUrl: './tipo-trabajador.component.html',
  styleUrls: ['./tipo-trabajador.component.scss']
})
export class TipoTrabajadorComponent implements OnInit {

  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public form!: FormGroup;
  public idTipoTrabajador!: number;
  public isEditar: boolean = false;
  public itemsTabla: ListaPaginaTipoTrabajadorResponse = new ListaPaginaTipoTrabajadorResponse();
  public listaTipoTrabajadores!: ListaPaginaTipoTrabajadorRequest;
  public nombre: string = '';
  public tipoTrabajadorItem!: ListaPaginaTipoTrabajadorResponseItem;
  public verMensajeSinDatos: boolean = false;

  constructor(
    public alertEliminarService: AlertEliminarTipoTrabajadorService,
    public fb: FormBuilder,
    public modalNuevoEditarTrabajadorService: ModalNuevoEditarTrabajadorService,
    public tipoTrabajadorService: TipoTrabajadorService,
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
      this.listaTipoTrabajadores.pageNumber = paginaActual;
      this.buscar();
    }
  }

  private async buscar() {
    this.itemsTabla = new ListaPaginaTipoTrabajadorResponse();
    let response = await this.service.obtenerListaTipoTrabajadores();
    this.itemsTabla = response.body!;

    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  setDatosBusqueda() {
    this.listaTipoTrabajadores = {
      idUsuario: parseInt(this.idUsuario),
      nombreTipoTrabajador: this.form.controls["nombre"].value.trim(),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10,
    }
  }

  private service = {
    obtenerListaTipoTrabajadores: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.tipoTrabajadorService.obtenerListaPaginaTipoTrabajador(this.listaTipoTrabajadores));
    }
  }

  public onClick = {
    nuevoTipoTrabajador: () => {
      this.isEditar = false;
      this.nombre = 'nuevo';
      this.modalNuevoEditarTrabajadorService.mostrarModal = true;
    },
    editarTipoTrabajador: async (editItem: ListaPaginaTipoTrabajadorResponseItem) => {
      this.tipoTrabajadorItem = editItem;
      this.isEditar = true;
      this.nombre = 'editar';
      this.modalNuevoEditarTrabajadorService.mostrarModal = true;
    },
    eliminarTipoTrabajador: async (idTipoTrabajador: number) => {
      this.idTipoTrabajador = idTipoTrabajador;
      this.alertEliminarService.mostrar = true;
    },
    buscar: () => {
      this.buscar();
    }
  }

  public actualizarTabla() {
    this.buscar();
  }

}
