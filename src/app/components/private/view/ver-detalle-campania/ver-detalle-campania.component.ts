import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginadaCosechasRequest } from 'src/app/models/requests/listaPaginadaCosechasRequest';
import { ValidarPertenenciaCampaniaSociedadRequest } from 'src/app/models/requests/validarPertenenciaCampaniaSociedadRequest';
import { ListaPaginadaCosechasResponse, ListaPaginadaCosechasResponseItem } from 'src/app/models/responses/listaPaginadaCosechasResponse';
import { Usuario } from 'src/app/models/usuario';
import { CampaniaService } from 'src/app/services/campania.service';
import { CosechaService } from 'src/app/services/cosecha.service';
import { NuevoCosechaVars } from './components/nuevo-cosecha/nuevo-cosecha.vars';
import { NuevoDetalleCosechaVars } from './components/nuevo-detalle-cosecha/nuevo-detalle-cosecha.vars';
import { VerDetalleCosechaVars } from './components/ver-detalle-cosecha/ver-detalle-cosecha.vars';
import { EliminarCosechaVars } from './components/eliminar-cosecha/eliminar-cosecha.vars';

@Component({
  selector: 'app-ver-detalle-campania',
  templateUrl: './ver-detalle-campania.component.html',
  styleUrls: ['./ver-detalle-campania.component.scss']
})
export class VerDetalleCampaniaComponent implements OnInit {
  public nombreCampania: string = '';
  public idCampania: string = '';
  public tituloModalNuevoCosecha: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(sessionStorage.getItem("usuario")!) as Usuario).idUsuario;
  public mostrarMensaje: boolean = false;
  public mostrarInformacion: boolean = false;
  public esEditarNuevoCosecha: boolean = false;
  public itemsTablaCosecha: ListaPaginadaCosechasResponse = new ListaPaginadaCosechasResponse();
  public cosechaItem!: ListaPaginadaCosechasResponseItem;
  public listaCosechas!: ListaPaginadaCosechasRequest;
  public verMensajeSinDatosCosecha: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private campaniaService: CampaniaService,
    private cosechaService: CosechaService,
    public modalNuevoCosecha: NuevoCosechaVars,
    public modalNuevoDetalleCosecha: NuevoDetalleCosechaVars,
    public modalVerDetalleCosecha: VerDetalleCosechaVars,
    public modalEliminarCosecha: EliminarCosechaVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.activatedRoute.params.subscribe((routeParams: any) => {
      this.idCampania = routeParams.id;
      this.nombreCampania = routeParams.nombre;
    });
    this.cargarDatos();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({

    });
  }

  private async cargarDatos() {
    try {
      await this.service.validarPertenenciaCampaniaSociedad();
      this.mostrarInformacion = true;
      this.buscarCosechas();
    } catch (error) {
      this.mostrarMensaje = true;
    }
  }

  public paginacionVarsCosechas: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVarsCosechas.paginaActual = paginaActual;
      this.listaCosechas.pageNumber = paginaActual;
      this.buscarCosechas();
    }
  }

  public async buscarCosechas() {
    this.itemsTablaCosecha = new ListaPaginadaCosechasResponse();
    let response = await this.service.obtenerListaPaginadaCosechas();
    this.itemsTablaCosecha = response.body!;
    this.verMensajeSinDatosCosecha = this.itemsTablaCosecha.data.length == 0;
    this.paginacionVarsCosechas.totalFilas = this.itemsTablaCosecha.totalRows!;
    this.paginacionVarsCosechas.totalPaginas = Math.ceil(this.itemsTablaCosecha.totalRows! / this.itemsTablaCosecha.pageSize!);
  }

  private setDatosBusquedaCosechas() {
    this.listaCosechas = {
      idCampania: parseInt(this.idCampania),
      pageNumber: this.paginacionVarsCosechas.paginaActual,
      pageSize: 10
    }
  }

  public onClick = {
    irAtras: () => {
      this.router.navigate(["intranet/sociedades"]);
    },
    nuevaCosecha: () => {
      this.modalNuevoCosecha.mostrarModal = true;
      this.esEditarNuevoCosecha = false;
    },
    editarCosecha: () => {
      this.modalNuevoCosecha.mostrarModal = true;
      this.esEditarNuevoCosecha = true;
    },
    nuevoDetalleCosecha: () => {
      this.modalNuevoDetalleCosecha.mostrarModal = true;
    },
    verDetalleCosecha: () => {
      this.modalVerDetalleCosecha.mostrarModal = true;
    },
    eliminarCosecha: () => {
      this.modalEliminarCosecha.mostrarModal = true;
    }
  }

  private service = {
    validarPertenenciaCampaniaSociedad: () => {
      let params: ValidarPertenenciaCampaniaSociedadRequest = {
        idUsuario: parseInt(this.idUsuario),
        idCampania: parseInt(this.idCampania)
      }
      return lastValueFrom(this.campaniaService.validar(params));
    },
    obtenerListaPaginadaCosechas: () => {
      this.setDatosBusquedaCosechas();
      return lastValueFrom(this.cosechaService.obtenerListaCosechas(this.listaCosechas));
    }
  }

}
