import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaCampaniasUsuarioRequest } from 'src/app/models/requests/listaPaginaCampaniasUsuarioRequest';
import { ListaPaginaCampaniasUsuarioResponse, ListaPaginaCampaniasUsuarioResponseItem } from 'src/app/models/responses/listaPaginaCampaniasUsuarioResponse';
import { Usuario } from 'src/app/models/usuario';
import { CampaniaService } from 'src/app/services/campania.service';

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
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private campaniaService: CampaniaService
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
    verMas: (item: ListaPaginaCampaniasUsuarioResponseItem) => {
      this.router.navigate(["intranet/sociedades/ver-detalle-campania",
                            item.idCampania.toString(),
                            item.nombre]);
    },
    // nuevaCampania: () => {
    //   this.isEditar = false;
    //   this.modalNuevoEditarCampaniaSociedad.mostrarModal = true;
    // }
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
