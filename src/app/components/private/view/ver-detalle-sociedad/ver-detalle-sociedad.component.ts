import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ValidarPertenenciaSociedadRequest } from 'src/app/models/requests/validarPertenenciaSociedadRequest';
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
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
   
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
