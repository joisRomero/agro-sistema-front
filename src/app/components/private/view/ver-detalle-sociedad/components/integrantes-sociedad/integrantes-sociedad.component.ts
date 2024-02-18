import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { last, lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ObtenerIntegrantesSociedadRequest } from 'src/app/models/requests/obtenerIntegrantesSociedadRequest';
import { ObtenerIntegrantesSociedadResponse, ObtenerIntegrantesSociedadResponseItem } from 'src/app/models/responses/obtenerIntegrantesSociedadResponse';
import { Usuario } from 'src/app/models/usuario';
import { SociedadService } from 'src/app/services/sociedad.service';
import { NuevoEditarIntegrantesSociedadVars } from '../modal-nuevo-editar-integrantes-sociedad/nuevo-editar-integrantes-sociedad-vars';
import { BusquedaIntegranteRequest } from 'src/app/models/requests/busquedaIntegranteRequest';
import { AlertAsignarDesasignarAdministradorService } from '../alert-asignar-desasignar-administrador/alert-asignar-desasignar-administrador.service';

@Component({
  selector: 'app-integrantes-sociedad',
  templateUrl: './integrantes-sociedad.component.html',
  styleUrls: ['./integrantes-sociedad.component.scss']
})
export class IntegrantesSociedadComponent implements OnInit {

  @Input() idSociedad: string = "";
  @Input() esAdministrador: boolean = false;
  public idUsuario: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  public form!: FormGroup;
  public listaIntegrantes!: ObtenerIntegrantesSociedadRequest;
  public integranteItem!: ObtenerIntegrantesSociedadResponseItem;
  public itemsTabla: ObtenerIntegrantesSociedadResponse = new ObtenerIntegrantesSociedadResponse();
  public verMensajeSinDatos: boolean = false;
  public esAsignarAdministrador: boolean = false;
  public esDesasignarAdministrador: boolean = false;
  public usuarioElegidoAdministrador!: ObtenerIntegrantesSociedadResponseItem;

  constructor(
    private fb: FormBuilder,
    private sociedadService: SociedadService,
    public modalIntegrantesSociedadVars: NuevoEditarIntegrantesSociedadVars,
    public alertAsignarDesasignarAdministradorService: AlertAsignarDesasignarAdministradorService
  ) { }

  ngOnInit(): void {
    this.inicarControles();    
    this.buscar()
  }

  private inicarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: [""]
    });
  }

  setDatosBusqueda() {
    this.listaIntegrantes = {
      idSociedad:  parseInt(this.idSociedad),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10,
      nombre: this.form.controls["nombre"].value.trim(),
    }
  }

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaIntegrantes.pageNumber = paginaActual;
      this.buscar();
    }
  }

  private async buscar() {
    this.itemsTabla = new ObtenerIntegrantesSociedadResponse();
    let response = await this.service.obtenerIntregrantesSociedad();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  public onClick = {
    buscar: () => {
      this.buscar();
    },
    nuevo: () => {
      this.modalIntegrantesSociedadVars.mostrarModal = true;
    },
    asignarUsuario: (item: ObtenerIntegrantesSociedadResponseItem)  => {
      this.esAsignarAdministrador = true;
      this.alertAsignarDesasignarAdministradorService.mostrar = true;
      this.usuarioElegidoAdministrador = item;
    },
    desasignarUsuario: (item: ObtenerIntegrantesSociedadResponseItem)  => {
      this.esDesasignarAdministrador = true;
      this.alertAsignarDesasignarAdministradorService.mostrar = true;
      this.usuarioElegidoAdministrador = item;
    },
  }

  public realizarRecarga() {
    this.buscar();
    this.esAsignarAdministrador = false;
    this.esDesasignarAdministrador = false;
  }

  private service = {
    obtenerIntregrantesSociedad: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.sociedadService.obtenerIntegrantesSociedad(this.listaIntegrantes));
    }
  }
}
