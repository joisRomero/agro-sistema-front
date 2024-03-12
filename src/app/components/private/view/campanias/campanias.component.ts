import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaCampaniasUsuarioRequest } from 'src/app/models/requests/listaPaginaCampaniasUsuarioRequest';
import { ListaPaginaCampaniasUsuarioResponse, ListaPaginaCampaniasUsuarioResponseItem } from 'src/app/models/responses/listaPaginaCampaniasUsuarioResponse';
import { Usuario } from 'src/app/models/usuario';
import { CampaniaService } from 'src/app/services/campania.service';
import { NuevoEditarCampaniaSociedadVars } from '../ver-detalle-sociedad/components/modal-nuevo-editar-campania-sociedad/nuevo-editar-campania-sociedad-vars';
import { FinalizarCampaniaVars } from '../ver-detalle-sociedad/components/finalizar-campania/finalizar-campania-vars';
import { AlerEliminarCampaniaVars } from '../ver-detalle-sociedad/components/aler-eliminar-campania/aler-eliminar-campania-vars';

@Component({
  selector: 'app-campanias',
  templateUrl: './campanias.component.html',
  styleUrls: ['./campanias.component.scss']
})
export class CampaniasComponent implements OnInit {
  public form!: FormGroup;
  public listaCampanias!: ListaPaginaCampaniasUsuarioRequest;
  public itemsTabla: ListaPaginaCampaniasUsuarioResponse = new ListaPaginaCampaniasUsuarioResponse();
  public verMensajeSinDatos: boolean = false;
  public isEditar: boolean = false;
  public idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public idCampaniaEditar!: number;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private campaniaService: CampaniaService,
    public modalNuevoEditarCampaniaSociedad: NuevoEditarCampaniaSociedadVars,
    public modalFinalizarCampania: FinalizarCampaniaVars,
    public modalEliminarCampania: AlerEliminarCampaniaVars
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

  setDatosBusqueda() {
    this.listaCampanias = {
      idUsuario:  parseInt(this.idUsuario),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10,
      nombre: this.form.controls["nombre"].value.trim(),
    }
  }

  private async buscar() {
    this.itemsTabla = new ListaPaginaCampaniasUsuarioResponse();
    let response = await this.service.obtenerListaPaginaCampaniasUsuario();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaCampanias.pageNumber = paginaActual;
      this.buscar();
    }
  }

  public onClick = {
    buscar: () => {
      this.buscar();
    },
    limpiar: () => {
      this.form.controls["nombre"].setValue("");
    },
    verMas: (item: ListaPaginaCampaniasUsuarioResponseItem) => {
      this.router.navigate(["intranet/mis-campanias/ver-detalle-campania",
                            item.idCampania.toString(),"actividades"]);
    },
    nuevaCampania: () => {
      this.isEditar = false;
      this.modalNuevoEditarCampaniaSociedad.mostrarModal = true;
    },
    editarCampania: (item: ListaPaginaCampaniasUsuarioResponseItem) => {
      this.isEditar = true;
      this.modalNuevoEditarCampaniaSociedad.mostrarModal = true;
      this.idCampaniaEditar = item.idCampania;
    },
    finalizarCampania: (item: ListaPaginaCampaniasUsuarioResponseItem) => {
      this.modalFinalizarCampania.mostrarModal = true;
      this.idCampaniaEditar = item.idCampania;
    },
    eliminarCampania: (item: ListaPaginaCampaniasUsuarioResponseItem) => {
      this.modalEliminarCampania.mostrar = true;
      this.idCampaniaEditar = item.idCampania;
    }
  }

  private service = {
    obtenerListaPaginaCampaniasUsuario: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.campaniaService.obtenerListaPaginaCampaniasUsuario(this.listaCampanias));
    }
  }

  public actualizarTabla(){
    this.buscar();
  }
}
