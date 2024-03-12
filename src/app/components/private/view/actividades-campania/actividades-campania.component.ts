import { Component, Input, OnInit } from '@angular/core';
import { NuevoEditarTrabajadorVars } from '../trabajador/components/nuevo-editar-trbajador/nuevo-editar-trabajador-vars';
import { NuevoEditarActividadVars } from './components/nuevo-editar-actividades/nuevo-editar-actividad-vars';
import { ActividadService } from 'src/app/services/actividad.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { Usuario } from 'src/app/models/usuario';
import { CombosService } from 'src/app/services/combos.service';
import { Paginacion } from 'src/app/models/paginacion';
import { lastValueFrom } from 'rxjs';
import { ObtenerTipoActividadPorUsuarioRequest } from 'src/app/models/requests/obtenerTipoActividadPorUsuarioRequest';
import { ListaPaginaActividadResponse, ListaPaginaActividadResponseItem } from 'src/app/models/responses/listaPaginaActividadResponse';
import { ListaPaginaActividadRequest } from 'src/app/models/requests/listaPaginaActividadRequest';
import { ActivatedRoute } from '@angular/router';
import { EliminarActividadVars } from './components/aler-eliminar-actividad/eliminar-actividad-vars';

@Component({
  selector: 'app-actividades-campania',
  templateUrl: './actividades-campania.component.html',
  styleUrls: ['./actividades-campania.component.scss']
})
export class ActividadesCampaniaComponent implements OnInit {

  public form!: FormGroup;
  public verMensajeSinDatos: boolean = false;
  @Input() idCampania: string = '';
  public isEditar: boolean = false;
  public valoresTipoActividad: GeneralSelectItem[] = [];
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  public itemsTabla: ListaPaginaActividadResponse = new ListaPaginaActividadResponse();
  public listaActividad!: ListaPaginaActividadRequest;
  public item!: ListaPaginaActividadResponseItem;
  public verDetalle: boolean = false;

  constructor(
    public nuevoEditarActividades: NuevoEditarActividadVars,
    public actividadService: ActividadService,
    private combosServices: CombosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public servicioAlert: EliminarActividadVars,
  ) { }

  ngOnInit(): void {
    this.inicarControles();
    this.setDatosBusqueda();
    this.buscar();
  }

  private inicarControles() {
    this.idCampania = this.route.snapshot.parent?.params['id'];
    this.form = this.fb.nonNullable.group({
      tipoActividad: [""],
      fechaActividad: [""],
    });
  }

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaActividad.pageNumber = paginaActual;
      this.buscar();
    }
  }

  public async buscar() {
    this.itemsTabla = new ListaPaginaActividadResponse();
    let response = await this.service.listarActividades();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  actualizarTabla() {
    this.buscar();
  }

  setDatosBusqueda() {
    this.listaActividad = {
      nombreTipoActividad: this.form.controls["tipoActividad"].value,
      fechaActividad: this.form.controls["fechaActividad"].value,
      idCampania: parseInt(this.idCampania),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10
    }
  }

  public click = {
    nuevo: () => {
      this.isEditar = false;
      this.verDetalle = false;
      this.nuevoEditarActividades.mostrarModal = true;
    },
    limpiar: () => {
      this.form.controls["tipoActividad"].setValue("");
      this.form.controls["fechaActividad"].setValue("");
    },
    editar: (item: ListaPaginaActividadResponseItem) => {
      this.isEditar = true;
      this.verDetalle = false;
      this.item = item;
      this.nuevoEditarActividades.mostrarModal = true;
    },
    verDetalle: (item: ListaPaginaActividadResponseItem) => {
      this.verDetalle = true;
      this.isEditar = false;
      this.item = item;
      this.nuevoEditarActividades.mostrarModal = true;
    },
    eliminar: (item: ListaPaginaActividadResponseItem) => {
      this.item = item;
      this.servicioAlert.mostrarModal = true;
    }
  }

  private service ={
    listarActividades: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.actividadService.listarActividades(this.listaActividad));
    },
    obtenerTipoActividdad: () => {
      let params: ObtenerTipoActividadPorUsuarioRequest = {
        idUsuario: this.idUsuarioStorage
      }
      return lastValueFrom(this.combosServices.obtenerTipoActividadPorUsuario(params));
    },
  }

}
