import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { listaPaginaAgroquimicoRequest } from 'src/app/models/requests/listaPaginaAgroquimicoRequest';
import { ListaPaginaAgroquimicoResponse, ListaPaginaAgroquimicoResponseItem } from 'src/app/models/responses/listaPaginaAgroquimicoResponse';
import { Usuario } from 'src/app/models/usuario';
import { AgroquimicoService } from 'src/app/services/agroquimico.service';
import { AlertEliminarAgroquimicoVars } from './components/alert-eliminar-agroquimico/alert-eliminar-agroquimico-vars';
import { NuevoEditarAgroquimicoVars } from './components/nuevo-editar-agroquimico/nuevo-editar-agroquimico-vars';
import { CombosService } from 'src/app/services/combos.service';
import { GeneralSelectItem } from 'src/app/models/general-select';

@Component({
  selector: 'app-agroquimicos',
  templateUrl: './agroquimicos.component.html',
  styleUrls: ['./agroquimicos.component.scss']
})
export class AgroquimicosComponent implements OnInit {
  public form!: FormGroup;
  public listaAbono!: listaPaginaAgroquimicoRequest;
  public itemsTabla:ListaPaginaAgroquimicoResponse = new ListaPaginaAgroquimicoResponse();
  public verMensajeSinDatos: boolean = false;
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  public isEditar: boolean = false;
  public item!: ListaPaginaAgroquimicoResponseItem; 
  public valoresTipoAgroquimico: GeneralSelectItem[] = [];

  constructor(
    public servicioModal: NuevoEditarAgroquimicoVars,
    public servicioModalEliminar: AlertEliminarAgroquimicoVars,
    private fb: FormBuilder,
    private serice: AgroquimicoService,
    private combosService: CombosService
  ) { }

  ngOnInit(): void {
    this.inicarControles();
    this.iniciarCombos();
    this.setDatosBusqueda();
    this.buscar();
  }

  private inicarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: [""],
      tipoAgroquimico: [""],
    });
  }

  iniciarCombos() {
    (async () => {
      this.valoresTipoAgroquimico = [];
      let response = await this.service.obtenerTipoAgroquimico();
      response.body!.forEach(e => {
        this.valoresTipoAgroquimico.push(new GeneralSelectItem(e.id, e.nombre));
      })
    })();
  }

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaAbono.pageNumber = paginaActual;
      this.buscar();
    }
  }

  public async buscar() {
    this.itemsTabla = new ListaPaginaAgroquimicoResponse();
    let response = await this.service.obtenerListaPaginada();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  actualizarTabla() {
    this.buscar();
  }

  setDatosBusqueda() {
    this.listaAbono = {
      nombre: this.form.controls["nombre"].value.trim(),
      idTipoAgroquimico: this.form.controls["tipoAgroquimico"].value,
      idUsuario: this.idUsuarioStorage,
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10
    }
  }

  onClick = {
    agregar: () => {
      this.isEditar = false;
      this.servicioModal.mostrarModal = true;
    }, 
    limpiar: () => {
      this.form.controls["nombre"].setValue("");
      this.form.controls["tipoAgroquimico"].setValue("")
    },
    editar: (item: ListaPaginaAgroquimicoResponseItem) => {
      this.isEditar = true;
      this.item = item;
      this.servicioModal.mostrarModal = true;
    },
    eliminar: (item: ListaPaginaAgroquimicoResponseItem) => {
      this.item = item;
      this.servicioModalEliminar.mostrarModal = true;
    },
  }

  private service = {
    obtenerListaPaginada: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.serice.obtenerListaPaginadaAgroquimico(this.listaAbono));
    },
    obtenerTipoAgroquimico: () => {
      return lastValueFrom(this.combosService.obtenerTipoAgroquimico());
    }
  }
}
