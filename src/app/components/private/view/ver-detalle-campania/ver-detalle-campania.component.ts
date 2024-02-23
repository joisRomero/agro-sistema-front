import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ValidarPertenenciaCampaniaSociedadRequest } from 'src/app/models/requests/validarPertenenciaCampaniaSociedadRequest';
import { Usuario } from 'src/app/models/usuario';
import { CampaniaService } from 'src/app/services/campania.service';

@Component({
  selector: 'app-ver-detalle-campania',
  templateUrl: './ver-detalle-campania.component.html',
  styleUrls: ['./ver-detalle-campania.component.scss']
})
export class VerDetalleCampaniaComponent implements OnInit {
  public nombreCampania: string = '';
  public idCampania: string = '';
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public mostrarMensaje: boolean = false;
  public mostrarInformacion: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaniaService: CampaniaService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams: any) => {
      this.idCampania = routeParams.id;
    });
    this.cargarDatos();
  }

  private async cargarDatos() {
    try {
      let response = await this.service.validarPertenenciaCampaniaSociedad();
      this.nombreCampania = response.body!.nombreCampania;
      this.mostrarInformacion = true;
      // this.buscarCosechas();
    } catch (error) {
      this.router.navigate(["intranet/mis-campanias"]);
    }
  }

  public onClick = {
    irAtras: () => {
      this.location.back();
    }
  }

  private service = {
    validarPertenenciaCampaniaSociedad: () => {
      let params: ValidarPertenenciaCampaniaSociedadRequest = {
        idUsuario: parseInt(this.idUsuario),
        idCampania: parseInt(this.idCampania)
      }
      return lastValueFrom(this.campaniaService.validar(params));
    }
  }

}
