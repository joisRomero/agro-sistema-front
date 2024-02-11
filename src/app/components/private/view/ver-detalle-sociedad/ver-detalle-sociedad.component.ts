import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion';
import { ListaPaginaCampaniasSocidadRequest } from 'src/app/models/requests/listaPaginaCampaniasSocidadRequest';
import { ObtenerIntegrantesSociedadRequest } from 'src/app/models/requests/obtenerIntegrantesSociedadRequest';
import { ValidarPertenenciaSociedadRequest } from 'src/app/models/requests/validarPertenenciaSociedadRequest';
import { ListaPaginaCampaniasSocidadResponse, ListaPaginaCampaniasSocidadResponseItem } from 'src/app/models/responses/listaPaginaCampaniasSocidadResponse';
import { ObtenerIntegrantesSociedadResponse, ObtenerIntegrantesSociedadResponseItem } from 'src/app/models/responses/obtenerIntegrantesSociedadResponse';
import { Usuario } from 'src/app/models/usuario';
import { SociedadService } from 'src/app/services/sociedad.service';

@Component({
  selector: 'app-ver-detalle-sociedad',
  templateUrl: './ver-detalle-sociedad.component.html',
  styleUrls: ['./ver-detalle-sociedad.component.scss']
})
export class VerDetalleSociedadComponent implements OnInit {

  public idSociedad: string = "";
  public nombreSociedad: string = "";
  public esAdministrador: boolean = false;
  private idUsuario: string = (JSON.parse(sessionStorage.getItem("usuario")!) as Usuario).idUsuario;
   
  constructor(
    private activatedRoute: ActivatedRoute,
    private sociedadService: SociedadService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams: any) => {
      this.idSociedad = routeParams.id;
    })
    this.cargarDatos();
  }
  private async cargarDatos() {
    try {
      let response = await this.service.validarPertenenciaSociedad();
      this.esAdministrador = response.body!.esAdministrador;
      this.nombreSociedad = response.body!.nombreSociedad;
    } catch (error) {
      this.router.navigate(["intranet/sociedades"]);
    }
  }
  
  public onClick = {
    irAtras: () => {
      this.router.navigate(["intranet/sociedades"]);
    }
  }

  private service = {
    validarPertenenciaSociedad: () => {
      let params : ValidarPertenenciaSociedadRequest = {
        idSociedad: parseInt(this.idSociedad),
        idUsuario: parseInt(this.idUsuario)
      }
      return lastValueFrom(this.sociedadService.validarPertenenciaSociedad(params));
    }
  }

}
