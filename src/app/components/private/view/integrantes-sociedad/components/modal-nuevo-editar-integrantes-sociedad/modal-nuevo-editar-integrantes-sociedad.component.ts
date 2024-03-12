import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEditarIntegrantesSociedadVars } from './nuevo-editar-integrantes-sociedad-vars';
import { Usuario } from 'src/app/models/usuario';
import { BusquedaIntegranteRequest } from 'src/app/models/requests/busquedaIntegranteRequest';
import { lastValueFrom } from 'rxjs';
import { SociedadService } from 'src/app/services/sociedad.service';
import { BusquedaIntegranteResponse } from 'src/app/models/responses/busquedaIntegranteResponse';
import { RegistrarInvitacionSociedadRequest } from 'src/app/models/requests/registrarInvitacionSociedadRequest';
import { InvitacionService } from 'src/app/services/invitacion.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';

@Component({
  selector: 'app-modal-nuevo-editar-integrantes-sociedad',
  templateUrl: './modal-nuevo-editar-integrantes-sociedad.component.html',
  styleUrls: ['./modal-nuevo-editar-integrantes-sociedad.component.scss']
})
export class ModalNuevoEditarIntegrantesSociedadComponent implements OnInit {

  @Output() actualizo = new EventEmitter();
  @Input() idSociedad: string = "";
  public tituloModal: string = '';
  public mensaje: string = '';
  public form!: FormGroup;
  public listaBuscado: BusquedaIntegranteResponse[] = [];
  public haySeleccionado: boolean = false;
  public mostrarModalDeNoEncontrados: boolean = false;
  public seleccionado!:BusquedaIntegranteResponse;
  public idUsuario: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  
  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: NuevoEditarIntegrantesSociedadVars,
    private fb: FormBuilder,
    private sociedadService: SociedadService,
    private invitacionService: InvitacionService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.tituloModal = "Nuevo Integrante";
    console.log(this.idSociedad)
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      nombre: ["",]
    });
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    },
     buscar: async () => {
      if(this.form.controls["nombre"]!.value.trim() != ""){
        this.haySeleccionado = false;
        let response = await this.service.busquedaIntegranteResponse();
        this.listaBuscado = response.body!;
        this.mostrarModalDeNoEncontrados = this.listaBuscado.length == 0;
        this.mensaje = "No se encontró usuarios con ese nombre.";
      }
    },
    seleccionar: (item: any) => {
      this.haySeleccionado = true;
      this.seleccionado = item
    },
    seleccionarNuevo: () => {
      this.haySeleccionado = false;
      this.listaBuscado = [];
      this.form.controls["nombre"].setValue("");
    },
    invitar: async () => {
      if(this.haySeleccionado) {
        let response = await this.service.registrarInvitacionSociedad();
        if (response.status == 200) {
          this.servicioModal.mostrarModal = false;
          this.alertInformationService.mostrar = true;
          this.alertInformationService.titulo = "Integrante";
          this.alertInformationService.texto = "Usuario invitado.";
        } 
      } else {
        this.mostrarModalDeNoEncontrados = true;
        this.mensaje = "Seleccione un usuario para que le envíe una invitación.";
      }
    }
  }

  private service = {
    busquedaIntegranteResponse: () => {
      let params: BusquedaIntegranteRequest = {
        idUsuario : this.idUsuario,
        nombre: this.form.controls["nombre"]!.value.trim(),
        idSociedad: parseInt(this.idSociedad),
      }
      return lastValueFrom(this.sociedadService.busquedaIntegrante(params));
    },
    registrarInvitacionSociedad: () => {
      let params: RegistrarInvitacionSociedadRequest = {
        idEmisor: this.idUsuario,
        idReceptor: this.seleccionado.idUsuario, 
        usuarioReceptor: this.seleccionado.nombreUsuario,
        idSociedad: parseInt(this.idSociedad),
        usuarioInserta: (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario
      }
      return lastValueFrom(this.invitacionService.registrarInvitacionSociedad(params));
    }
  }
  
}
