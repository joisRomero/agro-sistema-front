import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEditarIntegrantesSociedadVars } from './nuevo-editar-integrantes-sociedad-vars';
import { Usuario } from 'src/app/models/usuario';
import { BusquedaIntegranteRequest } from 'src/app/models/requests/busquedaIntegranteRequest';
import { lastValueFrom } from 'rxjs';
import { SociedadService } from 'src/app/services/sociedad.service';
import { BusquedaIntegranteResponse } from 'src/app/models/responses/busquedaIntegranteResponse';

@Component({
  selector: 'app-modal-nuevo-editar-integrantes-sociedad',
  templateUrl: './modal-nuevo-editar-integrantes-sociedad.component.html',
  styleUrls: ['./modal-nuevo-editar-integrantes-sociedad.component.scss']
})
export class ModalNuevoEditarIntegrantesSociedadComponent implements OnInit {

  @Output() actualizo = new EventEmitter();

  public tituloModal: string = '';
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
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    this.tituloModal = "Nuevo Integrante";
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
      if(this.form.controls["nombre"].value.trim() != ""){
        this.haySeleccionado = false;
        let response = await this.service.busquedaIntegranteResponse();
        this.listaBuscado = response.body!;
        this.mostrarModalDeNoEncontrados = this.listaBuscado.length == 0;
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
    }
  }

  private service = {
    busquedaIntegranteResponse: () => {
      let params: BusquedaIntegranteRequest = {
        idUsuario : this.idUsuario,
        nombre: this.form.controls["nombre"].value.trim()
      }
      return lastValueFrom(this.sociedadService.busquedaIntegrante(params));
    }
  }
  
}
