import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginadaCosechasRequest } from 'src/app/models/requests/listaPaginadaCosechasRequest';
import { ListaPaginadaCosechasResponse, ListaPaginadaCosechasResponseItem } from 'src/app/models/responses/listaPaginadaCosechasResponse';
import { CosechaService } from 'src/app/services/cosecha.service';
import { NuevoCosechaVars } from '../ver-detalle-campania/components/nuevo-cosecha/nuevo-cosecha.vars';
import { NuevoDetalleCosechaVars } from '../ver-detalle-campania/components/nuevo-detalle-cosecha/nuevo-detalle-cosecha.vars';
import { VerDetalleCosechaVars } from '../ver-detalle-campania/components/ver-detalle-cosecha/ver-detalle-cosecha.vars';
import { EliminarCosechaVars } from '../ver-detalle-campania/components/eliminar-cosecha/eliminar-cosecha.vars';

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

  constructor(
    private cosechaService: CosechaService,
    private fb: FormBuilder,
    public modalNuevoCosecha: NuevoCosechaVars,
    public modalNuevoDetalleCosecha: NuevoDetalleCosechaVars,
    public modalVerDetalleCosecha: VerDetalleCosechaVars,
    public modalEliminarCosecha: EliminarCosechaVars,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.buscarCosechas();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({

    });
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
    obtenerListaPaginadaCosechas: () => {
      this.setDatosBusquedaCosechas();
      return lastValueFrom(this.cosechaService.obtenerListaCosechas(this.listaCosechas));
    }
  }
}
