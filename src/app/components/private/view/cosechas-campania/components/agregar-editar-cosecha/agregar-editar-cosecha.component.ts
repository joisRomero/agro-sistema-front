import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgregarCosechaVars } from './agregar-cosecha.vars';
import { Cosecha } from 'src/app/models/cosecha';
import { Paginacion } from 'src/app/models/paginacion';
import { AgregarDetalleCosechaVars } from '../agregar-detalle-cosecha/agregar-detalle-cosecha.vars';
import { CosechaService } from 'src/app/services/cosecha.service';
import { lastValueFrom } from 'rxjs';
import { AgregarCosechaRequest, CosechaDetalleDTO } from 'src/app/models/requests/agregarCosechaRequest';
import { Usuario } from 'src/app/models/usuario';
import { CosechaDetalleEditarRequestDTO, EditarCosechaRequest } from 'src/app/models/requests/editarCosechaRequest';
import { ObtenerCosechaRequest } from 'src/app/models/requests/obtenerCosechaRequest';
import { ListaPaginadaCosechasResponseItem } from 'src/app/models/responses/listaPaginadaCosechasResponse';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { Convert } from 'src/app/utils/convert';

@Component({
  selector: 'app-agregar-editar-cosecha',
  templateUrl: './agregar-editar-cosecha.component.html',
  styleUrls: ['./agregar-editar-cosecha.component.scss']
})
export class AgregarEditarCosechaComponent implements OnInit {

  @Input() esEditar: boolean = false;
  @Output() actualizo = new EventEmitter();
  public tituloModal: string = 'Agregar cosecha';
  public form!: FormGroup;
  public cosechaItem!: Cosecha;
  public cosechaTabla: Cosecha[] = [];
  public cosechas: Cosecha[] = [];
  public verMensajeSinDatosCosechas: boolean = true;
  public isEditarCosecha: boolean = false;
  @Input() verDetalle: boolean = false;
  private nombreUsuarioStorage: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  @Input() idCampania: string = '';
  public listaCosechaDetalle: CosechaDetalleDTO[] = [];
  public listaCosechaModificarDetalle: CosechaDetalleEditarRequestDTO[] = [];
  @Input() item!: ListaPaginadaCosechasResponseItem;

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: AgregarCosechaVars,
    private fb: FormBuilder,
    public servicioModalCosecha: AgregarDetalleCosechaVars,
    public cosechaService: CosechaService,
    private alertInformationService: GeneralAlertInformationVars,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
  }

  private async iniciarControles() {
    this.form = this.fb.nonNullable.group({
      fecha: ["", [Validators.required]],
      descripcion: [""]
    })

    if(this.esEditar || this.verDetalle) {
      this.tituloModal = "Editar cosecha"
      let response = await this.service.obtenerCosecha();
      this.form.controls["fecha"].setValue(Convert.dateToDateInput(response.body!.fechaCosecha));
      this.form.controls["descripcion"].setValue(response.body!.descripcion);
      
      this.cosechas = [];
      
      response.body!.listaDetalleCosecha?.forEach((item, index) => {
        let cs: Cosecha = {
          idCosecha: item.idCosechaDetalle,
          numero: index + 1,
          cantidad: item.cantidad,
          unidad: item.unidad,
          unidadDescripcion: item.unidadDescripcion,
          calidad: item.calidad,
          calidadDescripcion: item.calidadDescripcion,
          descripcion: item.descripcion
        }
        this.cosechas.push(cs)
      })

      this.buscarCosecha();

      if(this.verDetalle){
        this.form.controls["fecha"].disable();
        this.form.controls["descripcion"].disable();
        this.tituloModal = "Ver detalle actividad"
      }

    } else {
      this.tituloModal = "Nueva cosecha"
    }
  }

  public paginacionCosechaVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionCosechaVars.paginaActual = paginaActual;
      this.buscarCosecha();
    }
  }

  public async buscarCosecha() {
    this.cosechaTabla = [];
    const elementosPorPagina = 10;
    const inicio = (this.paginacionCosechaVars.paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    this.cosechaTabla = this.cosechas.slice(inicio, fin);
    this.paginacionCosechaVars.totalFilas = this.cosechas.length;
    this.paginacionCosechaVars.totalPaginas = Math.ceil(this.cosechas.length / 10);
    this.verMensajeSinDatosCosechas = this.cosechas.length == 0;
  }

  public obtenerTrabajador(cosecha: Cosecha){
    if(this.isEditarCosecha){
      this.cosechas[cosecha.numero - 1] = cosecha;
    } else {
      let cosechab : Cosecha = {
        idCosecha: null,
        numero: this.cosechas.length + 1,
        cantidad: cosecha.cantidad,
        unidad: cosecha.unidad,
        unidadDescripcion: cosecha.unidadDescripcion,
        calidad: cosecha.calidad,
        calidadDescripcion: cosecha.calidadDescripcion,
        descripcion: cosecha.descripcion
      };
      this.cosechas.push(cosechab);
    }
    this.buscarCosecha();
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if(this.esEditar){
      let response = await this.service.editarCosecha();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.titulo = "Cosecha";
      this.alertInformationService.texto = "Cosecha editada.";
      this.alertInformationService.mostrar = true;
      this.actualizo.emit()
    } else {
      let response = await this.service.agregarCosecha();
      this.servicioModal.mostrarModal = false;
      this.alertInformationService.titulo = "Cosecha";
      this.alertInformationService.texto = "Cosecha agregada.";
      this.alertInformationService.mostrar = true;
      this.actualizo.emit()
    }
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    },
    agregarCosecha: () => {
      this.isEditarCosecha = false;
      this.servicioModalCosecha.mostrarModal = true;
    },
    editarCosecha: (cosecha: Cosecha) => {
      this.isEditarCosecha = true;
      this.servicioModalCosecha.mostrarModal = true;
      this.cosechaItem = cosecha;
    },
    eliminarCosecha: (cosecha: Cosecha) => {
      this.cosechas = this.cosechas.filter(objeto => objeto.numero !== cosecha.numero);
      let trabajadoresB: Cosecha[] = []
      for (let index = 0; index < this.cosechas.length; index++) {
        const element = this.cosechas[index];
        element.numero = index + 1;
        trabajadoresB.push(element);
      }
      this.buscarCosecha();
    },
  }

  service = {
    agregarCosecha: () => {
      this.listaCosechaDetalle = []

      this.cosechas.forEach(item => {
        let cs: CosechaDetalleDTO = {
          cantidad: item.cantidad,
          unidad: item.unidad,
          calidad: item.calidad,
          descripcion: item.descripcion
        }
        this.listaCosechaDetalle.push(cs)
      })

      let params: AgregarCosechaRequest = {
        fechaCosecha: this.form.controls["fecha"].value,
        idCampania: parseInt(this.idCampania),
        descripcion: this.form.controls["descripcion"].value,
        usuarioInserta: this.nombreUsuarioStorage,
        listaCosechaDetalle: this.listaCosechaDetalle
      }

      return lastValueFrom(this.cosechaService.agregarCosecha(params));

    },
    editarCosecha: () => {
      this.listaCosechaModificarDetalle = []

      this.cosechas.forEach(item => {
        let cs: CosechaDetalleEditarRequestDTO = {
          idCosechaDetalle: item.idCosecha,
          cantidad: item.cantidad,
          unidad: item.unidad,
          calidad: item.calidad,
          descripcion: item.descripcion
        }
        this.listaCosechaModificarDetalle.push(cs)
      })

      let params: EditarCosechaRequest = {
        idCosecha: this.item.idCosecha,
        fechaCosecha: this.form.controls["fecha"].value,
        idCampania: parseInt(this.idCampania),
        descripcion: this.form.controls["descripcion"].value,
        usuarioModifica: this.nombreUsuarioStorage,
        listaCosechaDetalle: this.listaCosechaModificarDetalle
      }

      return lastValueFrom(this.cosechaService.editarCosecha(params));
    },

    obtenerCosecha: () => {
      let params: ObtenerCosechaRequest = {
        idCosecha: this.item.idCosecha
      }
      return lastValueFrom(this.cosechaService.obtenerCosecha(params))
    }
  }

}
