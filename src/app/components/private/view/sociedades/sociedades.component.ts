import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginadaSociedadesRequest } from 'src/app/models/requests/listaPaginadaSociedadesRequest';
import { ListaPaginadaSociedadesResponse, ListaPaginadaSociedadesResponseItem } from 'src/app/models/responses/listaPaginadaSociedadesResponse';
import { Usuario } from 'src/app/models/usuario';
import { SociedadService } from 'src/app/services/sociedad.service';
import { DarDeBajaSociedadVars } from './components/dar-de-baja-sociedad/dar-de-baja-sociedad.vars';
import { IdSociedad } from 'src/app/models/id-sociedad';
import { ListaPaginadaSociedadResponse, ListaPaginadaSociedadResponseItem } from 'src/app/models/responses/listaPaginadaSociedadResponse';
import { NuevoEditarSociedadVars } from './components/nuevo-editar-sociedad/nuevo-editar-sociedad-vars';

@Component({
  selector: 'app-sociedades',
  templateUrl: './sociedades.component.html',
  styleUrls: ['./sociedades.component.scss']
})
export class SociedadesComponent implements OnInit {

  public form!: FormGroup;
  public nombre: string = '';
  public itemsTabla: ListaPaginadaSociedadesResponse = new ListaPaginadaSociedadesResponse();
  // public itemsTabla: ListaPaginadaSociedadResponse = new ListaPaginadaSociedadResponse();
  public isEditar: boolean = false;
  public idSociedad!: number;
  public sociedadItem!: ListaPaginadaSociedadesResponseItem;
  // public sociedadItem!: ListaPaginadaSociedadResponseItem;
  public listaSociedades!: ListaPaginadaSociedadesRequest;
  private idUsuario: string = (JSON.parse(sessionStorage.getItem("usuario")!) as Usuario).idUsuario;
  public verMensajeSinDatos: boolean = false;

  constructor(
    private fb: FormBuilder,
    public sociedadService: SociedadService,
    private router: Router,
    public modalEliminarSociedad: DarDeBajaSociedadVars,
    public modalNuevoEditarSociedad: NuevoEditarSociedadVars
  ) { }

  ngOnInit(): void {
    this.inicarControles();
    this.setDatosBusqueda();
    this.buscar();
  }

  private inicarControles() {
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
      this.listaSociedades.pageNumber = paginaActual;
      this.buscar();
    }
  }

  public async buscar() {
    this.itemsTabla = new ListaPaginadaSociedadesResponse();
    let response = await this.service.obtenerListaPaginadaSociedades();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  setDatosBusqueda() {
    this.listaSociedades = {
      nombre: this.form.controls["nombre"].value.trim(),
      idUsuario: parseInt(this.idUsuario),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10
    }
  }

  private service = {
    obtenerListaPaginadaSociedades: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.sociedadService.obtenerListaPaginadaSociedades(this.listaSociedades));
      // return lastValueFrom(this.sociedadService.obtenerListaSociedades(this.listaSociedades));
    },
    obtenerSociedadPorId: () => {
      let params: IdSociedad = {
        id: this.idSociedad
      }
      return lastValueFrom(this.sociedadService.obtenerPorId(params));
    }
  }

  public onClick = {
    nuevaSociedad: () => {
      this.isEditar = false;
      this.nombre = 'nuevo'
      this.modalNuevoEditarSociedad.mostrarModal = true;
    },
    verMas: (item: ListaPaginadaSociedadesResponseItem) => {
      this.router.navigate(["intranet/sociedades/ver-detalle-sociedad",
                            item.idSociedad.toString()]);
    },
    buscar: () => {
      this.buscar();
    },
    editarSociedad: async (editItem: ListaPaginadaSociedadesResponseItem) => {
      this.sociedadItem = editItem
      this.isEditar = true;
      this.nombre = 'editar'
      this.modalNuevoEditarSociedad.mostrarModal = true;
    },
    eliminarSociedad: async (idSociedad: number) => {
      this.idSociedad = idSociedad;
      this.modalEliminarSociedad.mostrarModal = true;
    },
  }

  actualizarTabla(){
    this.buscar();
  }

  onSubmitActualizarTabla() {
    this.buscar();
  }
}
