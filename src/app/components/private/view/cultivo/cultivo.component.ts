import { ListaPaginadaCultivosRequest } from './../../../../models/requests/listaPaginadaCultivosRequest';
import { Cultivo } from './../../../../models/cultivo';
import { IdCultivo } from './../../../../models/id-cultivo';
import { AlertEliminarService } from './components/alert-eliminar/alert-eliminar.service';
import { ListaCultivosResponse } from './../../../../models/responses/lista-cultivos-response';
import { ModalNuevoEditarCultivoService } from './components/modal-nuevo-editar-cultivo/modal-nuevo-editar-cultivo.service';
import { Component, OnInit } from '@angular/core';
import { CultivoService } from 'src/app/services/cultivo.service';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListaCultivosRequest } from 'src/app/models/requests/listaCultivosRequest';
import { Usuario } from 'src/app/models/usuario';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginadaCultivosResponse } from 'src/app/models/responses/listaPaginadaCultivosResponse';
import { ListaPaginadaCultivosResponseItem } from '../../../../models/responses/listaPaginadaCultivosResponse';

@Component({
  selector: 'app-cultivo',
  templateUrl: './cultivo.component.html',
  styleUrls: ['./cultivo.component.scss']
})
export class CultivoComponent implements OnInit {

  public isEditar: boolean = false;
  public nombre: string = '';
  public itemsTabla: ListaPaginadaCultivosResponse = new ListaPaginadaCultivosResponse();
  public idCultivo!: number;
  public cultivoItem!: ListaPaginadaCultivosResponseItem;
  //public cultivoItem!: number;
  /*public cultivoItem: ListaPaginadaCultivosResponseItem[] = [
    {
      idCultivo: 1,
      nombre: 'primer cultivo',
      numero: 1
    },
    {
      idCultivo: 2,
      nombre: 'segundo cultivo',
      numero: 2
    }
  ]*/
  public form!: FormGroup;
  public listaCultivos!: ListaPaginadaCultivosRequest;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public verMensajeSinDatos: boolean = false;

  constructor(
    public modalNuevoEditarCultivoService: ModalNuevoEditarCultivoService,
    public cultivoService: CultivoService,
    public alertEliminarService: AlertEliminarService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    //this.itemsTabla = new ListaPaginadaCultivosResponse();
    //console.log(this.itemsTabla);
    //console.log(this.itemsTabla.data);
    this.initialControls();
    this.setDatosBusqueda();
    this.buscar();
  }

  private initialControls() {
    this.form = this.fb.nonNullable.group({
      nombre: [""]
    });
  }

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaCultivos.PageNumber = paginaActual;
      this.buscar();
    }
  }

  private async buscar() {
    this.itemsTabla = new ListaPaginadaCultivosResponse();
    let response = await this.service.obtenerListaCultivos();
    this.itemsTabla = response.body!;

    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  setDatosBusqueda() {
    this.listaCultivos = {
      nombre: this.form.controls["nombre"].value.trim(),
      IdUsuario: parseInt(this.idUsuario),
      PageNumber: this.paginacionVars.paginaActual,
      PageSize: 10
    }
  }

  private service = {
    obtenerListaCultivos: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.cultivoService.obtenerListaCultivos(this.listaCultivos));
    },
    /*obtenerCultivoPorId: () => {
      let params: IdCultivo = {
        id: this.idCultivo
      }
      return lastValueFrom(this.cultivoService.obtenerPorId(params));
    }*/
  }

  public onClick = {
    nuevoCultivo: () => {
      this.isEditar = false;
      this.nombre = 'nuevo'
      this.modalNuevoEditarCultivoService.mostrarModal = true;
    },
    editarCultivo: async (editItem: ListaPaginadaCultivosResponseItem) => {
      this.cultivoItem = editItem
      console.log(this.cultivoItem)
      //let response = await this.service.obtenerCultivoPorId();
      //this.cultivoItem = response.body!;
      this.isEditar = true;
      this.nombre = 'editar'
      this.modalNuevoEditarCultivoService.mostrarModal = true;
    },
    eliminarCultivo: async (idCultivo: number) => {
      this.idCultivo = idCultivo;
      //let response = await this.service.obtenerCultivoPorId();
      //this.cultivoItem = response.body!;
      //this.isEditar = true;
      //this.nombre = 'editar';
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
