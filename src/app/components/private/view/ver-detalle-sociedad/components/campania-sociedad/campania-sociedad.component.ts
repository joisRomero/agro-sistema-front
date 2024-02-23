import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaCampaniasSocidadRequest } from 'src/app/models/requests/listaPaginaCampaniasSocidadRequest';
import { ListaPaginaCampaniasSocidadResponse, ListaPaginaCampaniasSocidadResponseItem } from 'src/app/models/responses/listaPaginaCampaniasSocidadResponse';
import { SociedadService } from 'src/app/services/sociedad.service';
import { NuevoEditarCampaniaSociedadVars } from '../modal-nuevo-editar-campania-sociedad/nuevo-editar-campania-sociedad-vars';
import { FinalizarCampaniaVars } from '../finalizar-campania/finalizar-campania-vars';
import { AlerEliminarCampaniaVars } from '../aler-eliminar-campania/aler-eliminar-campania-vars';

@Component({
  selector: 'app-campania-sociedad',
  templateUrl: './campania-sociedad.component.html',
  styleUrls: ['./campania-sociedad.component.scss']
})
export class CampaniaSociedadComponent implements OnInit {
  public form!: FormGroup;
  public listaCampanias!: ListaPaginaCampaniasSocidadRequest;
  @Input() idSociedad: string = "";
  @Input() esAdministrador: boolean = false;
  public itemsTabla: ListaPaginaCampaniasSocidadResponse = new ListaPaginaCampaniasSocidadResponse();
  public verMensajeSinDatos: boolean = false;
  public isEditar: boolean = false;
  public idCampaniaEditar!: number;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sociedadService: SociedadService,
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
      idSociedad:  parseInt(this.idSociedad),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10,
      nombre: this.form.controls["nombre"].value.trim(),
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
    verMas: (item: ListaPaginaCampaniasSocidadResponseItem) => {
      this.router.navigate(["intranet/sociedades/ver-detalle-campania",
                            item.idCampania.toString()]);
    },
    nuevaCampania: () => {
      this.isEditar = false;
      this.modalNuevoEditarCampaniaSociedad.mostrarModal = true;
    },
    editarCampania: (item: ListaPaginaCampaniasSocidadResponseItem) => {
      this.isEditar = true;
      this.modalNuevoEditarCampaniaSociedad.mostrarModal = true;
      this.idCampaniaEditar = item.idCampania;
    },
    finalizarCampania: (item: ListaPaginaCampaniasSocidadResponseItem) => {
      this.modalFinalizarCampania.mostrarModal = true;
      this.idCampaniaEditar = item.idCampania;
    },
    eliminarCampania: (item: ListaPaginaCampaniasSocidadResponseItem) => {
      this.modalEliminarCampania.mostrar = true;
      this.idCampaniaEditar = item.idCampania;
    }
  }

  private service = {
    obtenerListaPaginaCampaniasSocidad: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.sociedadService.obtenerListaPaginaCampaniasSocidad(this.listaCampanias));
    }
  }

  public actualizarTabla(){
    this.buscar();
  }
}
