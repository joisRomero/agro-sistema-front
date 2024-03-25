import { Component, Input, OnInit } from '@angular/core';
import { NuevoEditarGastosCampaniaVars } from './components/nuevo-editar-gastos-campania/nuevo-editar-gastos-campania-vars';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListaPaginaGastoDetalleResponse, ListaPaginaGastoDetalleResponseItem } from 'src/app/models/responses/listaPaginaGastoDetalleResponse';
import { ListaPaginaGastoDetalleRequest } from 'src/app/models/requests/listaPaginaGastoDetalleRequest';
import { GastoDetalleService } from 'src/app/services/gasto-detalle.service';
import { Paginacion } from 'src/app/models/paginacion';
import { lastValueFrom } from 'rxjs';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { ObtenerTipoGastoPorUsuarioRequest } from 'src/app/models/requests/obtenerTipoGastoPorUsuarioRequest';
import { CombosService } from 'src/app/services/combos.service';
import { Usuario } from 'src/app/models/usuario';
import { EliminarGastosCampaniaVars } from './components/alert-eliminar-gastos-campania/eliminar-gastos-campania.vars';
import { ActivatedRoute } from '@angular/router';
import { VerDetalleCampaniaDataVars } from '../ver-detalle-campania/ver-detalle-campania-data-vars';

@Component({
  selector: 'app-gastos-campania',
  templateUrl: './gastos-campania.component.html',
  styleUrls: ['./gastos-campania.component.scss']
})
export class GastosCampaniaComponent implements OnInit {
  public isEditarGasto: boolean = false;
  public form!: FormGroup;
  public nombre: string = '';
  public itemsTabla: ListaPaginaGastoDetalleResponse = new ListaPaginaGastoDetalleResponse();
  public gastoDetalleItem!: ListaPaginaGastoDetalleResponseItem;
  public listaGastoDetalles!: ListaPaginaGastoDetalleRequest; //
  public verMensajeSinDatos: boolean = false;
  @Input() idCampania: string = '';
  public valoresTipoGasto: GeneralSelectItem[] = [];
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);

  constructor(
    public servicioModal: NuevoEditarGastosCampaniaVars,
    private fb: FormBuilder,
    public gastoDetalleService: GastoDetalleService,
    private combosServices: CombosService,
    public eliminarGastoDetalleService: EliminarGastosCampaniaVars,
    private route: ActivatedRoute,
    public data: VerDetalleCampaniaDataVars
  ) { }

  ngOnInit(): void {
    this.idCampania = this.route.snapshot.parent?.params['id'];
    this.inicarControles();
    this.setDatosBusqueda();
    this.buscar();
  }

  private inicarControles() {
    this.form = this.fb.nonNullable.group({
      tipoGasto: [""],
      fechaGasto: [""],
    });
  }
  


  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaGastoDetalles.pageNumber = paginaActual;
      this.buscar();
    }
  }

  public async buscar() {
    this.itemsTabla = new ListaPaginaGastoDetalleResponse();
    let response = await this.service.obtenerListaPaginadaGastoDetalle();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  actualizarTabla() {
    this.buscar();
  }

  setDatosBusqueda() {
    this.listaGastoDetalles = {
      nombreTipoGasto: this.form.controls["tipoGasto"].value,
      fechaGasto: this.form.controls["fechaGasto"].value,
      idCampania: parseInt(this.idCampania),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10
    }
  }

  onClick = {
    agregarGasto: () => {
      this.isEditarGasto = false;
      this.servicioModal.mostrarModal = true;
    }, 
    limpiar: () => {
      this.form.controls["tipoGasto"].setValue("");
      this.form.controls["fechaGasto"].setValue("");
    },
    editarGasto: (item: ListaPaginaGastoDetalleResponseItem) => {
      this.isEditarGasto = true;
      this.gastoDetalleItem = item;
      this.servicioModal.mostrarModal = true;
    },
    eliminarGasto: (item: ListaPaginaGastoDetalleResponseItem) => {
      this.gastoDetalleItem = item;
      this.eliminarGastoDetalleService.mostrarModal = true;
    },
  }

  private service ={
    obtenerListaPaginadaGastoDetalle: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.gastoDetalleService.obtenerListaPaginadaGastoDetalle(this.listaGastoDetalles));
    },
    obtenerTipoGasto: () => {
      let params: ObtenerTipoGastoPorUsuarioRequest = {
        idUsuario: this.idUsuarioStorage
      }
      return lastValueFrom(this.combosServices.obtenerTipoGastoPorUsuario(params));
    },
  }

}
