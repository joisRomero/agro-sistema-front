import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginadaSociedadesRequest } from 'src/app/models/requests/listaPaginadaSociedadesRequest';
import { ListaPaginadaSociedadesResponse, ListaPaginadaSociedadesResponseItem } from 'src/app/models/responses/listaPaginadaSociedadesResponse';
import { Usuario } from 'src/app/models/usuario';
import { SociedadService } from 'src/app/services/sociedad.service';

@Component({
  selector: 'app-sociedades',
  templateUrl: './sociedades.component.html',
  styleUrls: ['./sociedades.component.scss']
})
export class SociedadesComponent implements OnInit {

  public form!: FormGroup;
  public itemsTabla: ListaPaginadaSociedadesResponse = new ListaPaginadaSociedadesResponse();
  public isEditar: boolean = false;
  public sociedadItem!: ListaPaginadaSociedadesResponseItem;
  public listaSociedades!: ListaPaginadaSociedadesRequest;
  private idUsuario: string = (JSON.parse(sessionStorage.getItem("usuario")!) as Usuario).idUsuario;
  public verMensajeSinDatos: boolean = false;

  constructor(
    private fb: FormBuilder,
    public sociedadService: SociedadService,
    private router: Router
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

  public paginacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionVars.paginaActual = paginaActual;
      this.listaSociedades.pageNumber = paginaActual;
      this.buscar();
    }
  }

  private async buscar() {
    this.itemsTabla = new ListaPaginadaSociedadesResponse();
    let response = await this.service.obtenerListaPaginadaSociedades();
    this.itemsTabla = response.body!;
    this.verMensajeSinDatos = this.itemsTabla.data.length == 0;
    this.paginacionVars.totalFilas = this.itemsTabla.totalRows!;
    this.paginacionVars.totalPaginas = Math.ceil(this.itemsTabla.totalRows! / this.itemsTabla!.pageSize!);
  }

  setDatosBusqueda() {
    this.listaSociedades = {
      nombre: this.form.controls["nombre"].value.trim(),
      idUsuario: parseInt(this.idUsuario),
      pageNumber: this.paginacionVars.paginaActual,
      pageSize: 10
    }
  }

  private service = {
    obtenerListaPaginadaSociedades: () => {
      return lastValueFrom(this.sociedadService.obtenerListaPaginadaSociedades(this.listaSociedades));
    }
  }

  public onClick = {
    nuevo: () => {

    },
    verMas: (item: ListaPaginadaSociedadesResponseItem) => {
      this.router.navigate(["intranet/sociedades/ver-detalle-sociedad",
                            item.idSociedad.toString(),
                            item.nombre]);
    }
  }

  onSubmitActualizarTabla() {
    this.buscar();
  }
}
