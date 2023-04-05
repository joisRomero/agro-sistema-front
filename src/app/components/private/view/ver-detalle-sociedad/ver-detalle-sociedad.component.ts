import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaCampaniasSocidadRequest } from 'src/app/models/requests/listaPaginaCampaniasSocidadRequest';
import { ObtenerIntegrantesSociedadRequest } from 'src/app/models/requests/obtenerIntegrantesSociedadRequest';
import { ListaPaginaCampaniasSocidadResponse, ListaPaginaCampaniasSocidadResponseItem } from 'src/app/models/responses/listaPaginaCampaniasSocidadResponse';
import { ObtenerIntegrantesSociedadResponse } from 'src/app/models/responses/obtenerIntegrantesSociedadResponse';
import { Usuario } from 'src/app/models/usuario';
import { SociedadService } from 'src/app/services/sociedad.service';

@Component({
  selector: 'app-ver-detalle-sociedad',
  templateUrl: './ver-detalle-sociedad.component.html',
  styleUrls: ['./ver-detalle-sociedad.component.scss']
})
export class VerDetalleSociedadComponent implements OnInit {

  private idSociedad: string = "";
  public nombreSociedad: string = "";
  private idUsuario: string = (JSON.parse(sessionStorage.getItem("usuario")!) as Usuario).idUsuario;
  public integrantes: ObtenerIntegrantesSociedadResponse[] = [];
  public listaCampanias!: ListaPaginaCampaniasSocidadRequest;
  public campaniaItem!: ListaPaginaCampaniasSocidadResponseItem;
  public itemsTabla: ListaPaginaCampaniasSocidadResponse = new ListaPaginaCampaniasSocidadResponse();
  public verMensajeSinDatos: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sociedadService: SociedadService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams: any) => {
      this.idSociedad = routeParams.id;
      this.nombreSociedad = routeParams.nombre;
    })
    this.cargarDatos();
    this.setDatosBusqueda();
    this.buscar();
  }

  setDatosBusqueda() {
    this.listaCampanias = {
      idSociedad:  parseInt(this.idSociedad),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10
    }
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

  private async buscar() {
    this.itemsTabla = new ListaPaginaCampaniasSocidadResponse();
    let response = await this.service.obtenerListaPaginaCampaniasSocidad();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  public onClick = {
    irAtras: () => {
      this.router.navigate(["intranet/sociedades"]);
    }
  }

  private async cargarDatos() {
    let response = await this.service.obtenerIntregrantesSociedad();
    this.integrantes = response.body!;
  }

  private service = {
    obtenerIntregrantesSociedad: () => {
      let params : ObtenerIntegrantesSociedadRequest = {
        idUsuario: parseInt(this.idUsuario),
        idSociedad: parseInt(this.idSociedad)
      }
      return lastValueFrom(this.sociedadService.obtenerIntegrantesSociedad(params));
    },
    obtenerListaPaginaCampaniasSocidad: () => {
      return lastValueFrom(this.sociedadService.obtenerListaPaginaCampaniasSocidad(this.listaCampanias));
    }
  }

}
