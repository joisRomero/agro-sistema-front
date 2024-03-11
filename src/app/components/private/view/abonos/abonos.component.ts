import { Component, OnInit } from '@angular/core';
import { NuevoEditarAbonoVars } from './components/nuevo-editar-abono/nuevo-editar-abono-vars';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaAbonoRequest } from 'src/app/models/requests/listaPaginaAbonoRequest';
import { ListaPaginaAbonoResponse, ListaPaginaAbonoResponseItem } from 'src/app/models/responses/listaPaginaAbonoResponse';
import { AbonoService } from 'src/app/services/abono.service';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AlertEliminarAbonoVars } from './components/alert-eliminar-abono/alert-eliminar-abono-vars';

@Component({
  selector: 'app-abonos',
  templateUrl: './abonos.component.html',
  styleUrls: ['./abonos.component.scss']
})
export class AbonosComponent implements OnInit {
  public form!: FormGroup;
  public listaAbono!: ListaPaginaAbonoRequest;
  public itemsTabla:ListaPaginaAbonoResponse = new ListaPaginaAbonoResponse();
  public verMensajeSinDatos: boolean = false;
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  public isEditar: boolean = false;
  public item!: ListaPaginaAbonoResponseItem; 

  constructor(
    public servicioModal: NuevoEditarAbonoVars,
    public servicioModalEliminar: AlertEliminarAbonoVars,
    private fb: FormBuilder,
    private serice: AbonoService
  ) { }

  ngOnInit(): void {
    this.inicarControles();
    this.setDatosBusqueda();
    this.buscar();
  }

  private inicarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: [""],
    });
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
    this.itemsTabla = new ListaPaginaAbonoResponse();
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
    },
    editar: (item: ListaPaginaAbonoResponseItem) => {
      this.isEditar = true;
      this.item = item;
      this.servicioModal.mostrarModal = true;
    },
    eliminar: (item: ListaPaginaAbonoResponseItem) => {
      this.item = item;
      this.servicioModalEliminar.mostrarModal = true;
    },
  }

  private service = {
    obtenerListaPaginada: () => {
      this.setDatosBusqueda();
      return lastValueFrom(this.serice.obtenerListaPaginadaAbono(this.listaAbono));
    }
  }
  

}
