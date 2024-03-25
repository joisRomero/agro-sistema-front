import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginadaCosechasRequest } from 'src/app/models/requests/listaPaginadaCosechasRequest';
import { ListaPaginadaCosechasResponse, ListaPaginadaCosechasResponseItem } from 'src/app/models/responses/listaPaginadaCosechasResponse';
import { CosechaService } from 'src/app/services/cosecha.service';

import { ActivatedRoute } from '@angular/router';
import { AgregarCosechaVars } from './components/agregar-editar-cosecha/agregar-cosecha.vars';
import { EliminarCosechaVars } from './components/alert-eliminar-cosecha/eliminar-cosecha-vars';
import { VerDetalleCampaniaDataVars } from '../ver-detalle-campania/ver-detalle-campania-data-vars';

@Component({
  selector: 'app-cosechas-campania',
  templateUrl: './cosechas-campania.component.html',
  styleUrls: ['./cosechas-campania.component.scss']
})
export class CosechasCampaniaComponent implements OnInit {

  public form!: FormGroup;
  public tituloModalNuevoCosecha: string = '';
  public verMensajeSinDatosCosecha: boolean = false;
  public esEditarNuevoCosecha: boolean = false;
  public itemsTablaCosecha: ListaPaginadaCosechasResponse = new ListaPaginadaCosechasResponse();
  public cosechaItem!: ListaPaginadaCosechasResponseItem;
  public listaCosechas!: ListaPaginadaCosechasRequest;
  @Input() idCampania: string = '';
  public verDetalle: boolean = false;

  constructor(
    private cosechaService: CosechaService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public servicioModal: AgregarCosechaVars,
    public servicioAlert: EliminarCosechaVars,
    public data: VerDetalleCampaniaDataVars
  ) { }

  ngOnInit(): void {
    this.idCampania = this.route.snapshot.parent?.params['id'];
    this.iniciarControles();
    this.buscar();
  }

  private iniciarControles() {
    this.idCampania = this.route.snapshot.parent?.params['id'];
    this.form = this.fb.nonNullable.group({
      fechaCosecha: [""],
    });
  }

  public paginacionVarsCosechas: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVarsCosechas.paginaActual = paginaActual;
      this.listaCosechas.pageNumber = paginaActual;
      this.buscar();
    }
  }

  public async buscar() {
    this.itemsTablaCosecha = new ListaPaginadaCosechasResponse();
    let response = await this.service.obtenerListaPaginadaCosechas();
    this.itemsTablaCosecha = response.body!;
    this.verMensajeSinDatosCosecha = this.itemsTablaCosecha.data.length == 0;
    this.paginacionVarsCosechas.totalFilas = this.itemsTablaCosecha.totalRows!;
    this.paginacionVarsCosechas.totalPaginas = Math.ceil(this.itemsTablaCosecha.totalRows! / this.itemsTablaCosecha.pageSize!);
  }


  private setDatosBusquedaCosechas() {
    this.listaCosechas = {
      fechaCosecha: this.form.controls["fechaCosecha"].value,
      idCampania: parseInt(this.idCampania),
      pageNumber: this.paginacionVarsCosechas.paginaActual,
      pageSize: 10
    }
  }

  public onClick = {
    nuevaCosecha: () => {
      this.servicioModal.mostrarModal = true;
      this.esEditarNuevoCosecha = false;
      this.verDetalle = false;
    },
    editarCosecha: (item: ListaPaginadaCosechasResponseItem) => {
      this.servicioModal.mostrarModal = true;
      this.esEditarNuevoCosecha = true;
      this.cosechaItem = item;
      this.verDetalle = false;
    },
    verDetalleCosecha: (item: ListaPaginadaCosechasResponseItem) => {
      this.servicioModal.mostrarModal = true;
      this.esEditarNuevoCosecha = false;
      this.cosechaItem = item;
      this.verDetalle = true;
    },
    eliminarCosecha: (item: ListaPaginadaCosechasResponseItem) => {
      this.servicioAlert.mostrarModal = true;
      this.cosechaItem = item;
    },
    limpiar: () => {
      this.form.controls["fechaCosecha"].setValue("");
    },
  }

  private service = {
    obtenerListaPaginadaCosechas: () => {
      this.setDatosBusquedaCosechas();
      return lastValueFrom(this.cosechaService.obtenerListaCosechas(this.listaCosechas));
    }
  }
}
