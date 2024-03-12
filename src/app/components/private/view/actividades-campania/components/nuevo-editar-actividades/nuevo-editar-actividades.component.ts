import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEditarTrabajadorVars } from '../../../trabajador/components/nuevo-editar-trbajador/nuevo-editar-trabajador-vars';
import { NuevoEditarGastosVars } from '../../../gastos/components/nuevo-editar-gastos/nuevo-editar-gastos-vars';
import { NuevoEditarActividadVars } from './nuevo-editar-actividad-vars';
import { Trabajador } from 'src/app/models/trabajador';
import { Paginacion } from 'src/app/models/paginacion';
import { Gasto } from 'src/app/models/gasto';
import { ObtenerTipoActividadPorUsuarioRequest } from 'src/app/models/requests/obtenerTipoActividadPorUsuarioRequest';
import { Usuario } from 'src/app/models/usuario';
import { lastValueFrom } from 'rxjs';
import { CombosService } from 'src/app/services/combos.service';
import { GeneralSelectItem } from 'src/app/models/general-select';
import { AgregarActividadTrabajadorRequest, GastoDTO, TrabajadorDTO } from 'src/app/models/requests/agregarActividadTrabajadorRequest';
import { ActividadService } from 'src/app/services/actividad.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { ListarDetalleActividadRequest } from 'src/app/models/requests/listarDetalleActividadRequest';
import { ListaPaginaActividadResponseItem } from 'src/app/models/responses/listaPaginaActividadResponse';
import { Convert } from 'src/app/utils/convert';
import { ModificarTipoActividadRequest } from 'src/app/models/requests/modificarTipoActividadRequest';
import { GastoTrabajadorModificarDTO, ModificarActividadTrabajadorGastosRequest, TrabajadorModificarDTO } from 'src/app/models/requests/modificarActividadTrabajadorGastosRequest';
import { EliminarActividadVars } from '../aler-eliminar-actividad/eliminar-actividad-vars';

@Component({
  selector: 'app-nuevo-editar-actividades',
  templateUrl: './nuevo-editar-actividades.component.html',
  styleUrls: ['./nuevo-editar-actividades.component.scss']
})
export class NuevoEditarActividadesComponent implements OnInit {

  public form!: FormGroup;
  @Input() isEditarActividad: boolean = false;
  @Input() idCampania: string = '';
  @Output() actualizo = new EventEmitter();
  public isEditarTrabajador: boolean = false;
  public isEditarGasto: boolean = false;
  public trabajadores: Trabajador[] = [];
  public gastos: Gasto[] = [];
  public trabajadoresTabla: Trabajador[] = [];
  public gastosTabla: Gasto[] = [];
  public mensajesError = {
    actividad: "El campo es obligatorio.",
    fecha: "El campo es obligatorio.",
  }
  public trabajadorItem!: Trabajador;
  public gastoItem!: Gasto;
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  private nombreUsuarioStorage: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public valoresTipoActividad: GeneralSelectItem[] = [];
  public verMensajeSinDatosTrabajadores: boolean = true;
  public verMensajeSinDatosGastos: boolean = true;
  public listaTrabajadoresRequestDTO: TrabajadorDTO[] = [];
  public listaGastosRequestDTO: GastoDTO[] = [];
  public listaTrabajadoresModificaRequestDTO: TrabajadorModificarDTO[] = [];
  public listaGastosModificaRequestDTO: GastoTrabajadorModificarDTO[] = [];
  public tituloModal: string = '';
  @Input() item!: ListaPaginaActividadResponseItem;
  @Input() verDetalle: boolean = false;
  public tipoActividadSeleccion:number = 0;

  constructor(
    public fb: FormBuilder,
    public nuevoEditarTrabajadorVars: NuevoEditarTrabajadorVars,
    public nuevoEditarGastosVars: NuevoEditarGastosVars,
    public nuevoEditaractividades: NuevoEditarActividadVars,
    public combosService: CombosService,
    public actividadService: ActividadService,
    private alertInformationService: GeneralAlertInformationVars,
  ) { }

  ngOnInit(): void {
    this.initialControls();
    this.iniciarCombos();
  }

  async initialControls() {
    this.form = this.fb.nonNullable.group({
      actividad: ["", Validators.required],
      fecha: ["", Validators.required],
      descripcion: [""],
      cantidadSemilla: [""],
      unidadSemilla: [""],
      cantidadFumigacion: [""],
      unidadFumigacion: [""],
    });

    if(this.isEditarActividad || this.verDetalle) {
      this.tituloModal = "Editar actividad";
      let response = await this.service.obtenerActividad();

      this.form.controls["actividad"].setValue(response.body!.idTipoActividad);
      this.form.controls["fecha"].setValue(Convert.dateToDateInput(response.body!.fechaActividad));
      this.form.controls["descripcion"].setValue(response.body!.descripcionActividad);

      this.trabajadores = [];
      response.body!.listaDetalleTrabajadores?.forEach((item,index) => {
        let ab: Trabajador = {
          idTrabajador: item.idTrabajador,
          descripcion: item.descripcionTrabajador,
          cantidad: item.cantidadTrabajador,
          costoUnitario: item.costoUnitario,
          costoTotal: item.costoTotal,
          idTipoTrabajador: item.idTipoTrabajador,
          descripcionTipoTrabajador: item.descripcionTipoTrabajador,
          numero: index + 1
        }
        this.trabajadores.push(ab);
      });
      
      this.gastos = [];
      response.body!.listaDetalleGastos?.forEach((item, index) => {
        let cd: Gasto = {
          idGasto: item.idGastoDetalle,
          descripcion: item.descripcionGastoDetalle,
          cantidad: item.cantidadGastoDetalle,
          costoUnitario: item.costoUnitarioGastoDetalle,
          costoTotal: item.costoTotalGastoDetalle,
          idTipoGasto: item.idTipoGasto,
          descripcionTipoGasto: "",
          numero: index+1
        }
        this.gastos.push(cd)
      });
      
      this.buscarTrabajadores();
      this.buscarGastos();


      if(this.verDetalle){
        this.form.controls["actividad"].disable();
        this.form.controls["fecha"].disable();
        this.form.controls["descripcion"].disable();
        this.tituloModal = "Ver detalle actividad"
      }
    } else {
      this.tituloModal = "Nueva actividad";
    }
  }

  iniciarCombos() {
    (async () => {
      this.valoresTipoActividad = [];
      let response = await this.service.obtenerTipoActividadPorUsuario();
      response.body!.forEach(e => {
        this.valoresTipoActividad.push(new GeneralSelectItem(e.idTipoActividad, e.nombreTipoActividad));
      })
    })();
  }

  changeActividad(){
    // this.tipoActividadSeleccion = this.form.controls["actividad"].value;
  }

  public paginacionTrabajadorVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionTrabajadorVars.paginaActual = paginaActual;
      this.buscarTrabajadores();
    }
  }

  public paginacionGastosVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionGastosVars.paginaActual = paginaActual;
      this.buscarTrabajadores();
    }
  }

  public async buscarTrabajadores() {
    this.trabajadoresTabla = [];
    const elementosPorPagina = 10;
    const inicio = (this.paginacionTrabajadorVars.paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    this.trabajadoresTabla = this.trabajadores.slice(inicio, fin);
    this.paginacionTrabajadorVars.totalFilas = this.trabajadores.length;
    this.paginacionTrabajadorVars.totalPaginas = Math.ceil(this.trabajadores.length / 10);
    this.verMensajeSinDatosTrabajadores = this.trabajadores.length == 0;

  }

  public async buscarGastos() {
    this.gastosTabla = [];
    const elementosPorPagina = 10;
    const inicio = (this.paginacionGastosVars.paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    this.gastosTabla = this.gastos.slice(inicio, fin);
    this.paginacionGastosVars.totalFilas = this.gastos.length;
    this.paginacionGastosVars.totalPaginas = Math.ceil(this.gastos.length / 10);
    this.verMensajeSinDatosGastos = this.gastos.length == 0;
  }

  public obtenerTrabajador(trabajador: Trabajador){
    if(this.isEditarTrabajador){
      this.trabajadores[trabajador.numero - 1] = trabajador;
    } else {
      let trabajadorb : Trabajador = {
        idTrabajador: null,
        numero: this.trabajadores.length + 1,
        cantidad: trabajador.cantidad,
        costoTotal: trabajador.costoTotal,
        costoUnitario: trabajador.costoUnitario,
        descripcion: trabajador.descripcion,
        descripcionTipoTrabajador: trabajador.descripcionTipoTrabajador,
        idTipoTrabajador: trabajador.idTipoTrabajador
      };
      this.trabajadores.push(trabajadorb);
    }
    this.buscarTrabajadores();
  }

  public obtenerGasto(gasto: Gasto){
    if(this.isEditarGasto){
      this.gastos[gasto.numero - 1] = gasto;
    } else {
      let gastob : Gasto = {
        idGasto: null,
        numero: this.gastos.length + 1,
        cantidad: gasto.cantidad,
        costoTotal: gasto.costoTotal,
        costoUnitario: gasto.costoUnitario,
        descripcion: gasto.descripcion,
        descripcionTipoGasto: gasto.descripcionTipoGasto,
        idTipoGasto: gasto.idTipoGasto
      };
      this.gastos.push(gastob);
    }
    this.buscarGastos();
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    if(this.isEditarActividad){
      let response = await this.service.editarActividad();
      this.nuevoEditaractividades.mostrarModal = false;
      this.alertInformationService.titulo = "Actividad";
      this.alertInformationService.texto = "Actividad editada.";
      this.alertInformationService.mostrar = true;
      this.actualizo.emit()
    } else {
      let response = await this.service.agregarActividad();
      this.nuevoEditaractividades.mostrarModal = false;
      this.alertInformationService.titulo = "Actividad";
      this.alertInformationService.texto = "Actividad agregada.";
      this.alertInformationService.mostrar = true;
      this.actualizo.emit()
    }
  }

  onClick = {
    agregarTrabajador: () => {
      this.isEditarTrabajador = false;
      this.nuevoEditarTrabajadorVars.mostrarModal = true;
    },
    agregarGasto: () => {
      this.isEditarGasto = false;
      this.nuevoEditarGastosVars.mostrarModal = true;
    },
    cancelar: () => {
      this.nuevoEditaractividades.mostrarModal = false;
    },
    eliminarTrabajador: (trabajador: Trabajador) => {
      this.trabajadores = this.trabajadores.filter(objeto => objeto.numero !== trabajador.numero);
      let trabajadoresB: Trabajador[] = []
      for (let index = 0; index < this.trabajadores.length; index++) {
        const element = this.trabajadores[index];
        element.numero = index + 1;
        trabajadoresB.push(element);
      }
      this.buscarTrabajadores();
    },
    eliminarGasto: (gasto: Gasto) => {
      this.gastos = this.gastos.filter(objeto => objeto.numero !== gasto.numero);
      let gastoesB: Gasto[] = []
      for (let index = 0; index < this.gastos.length; index++) {
        const element = this.gastos[index];
        element.numero = index + 1;
        gastoesB.push(element);
      }
      this.buscarGastos();
    },
    editarTrabajador: (trabajador: Trabajador) => {
      this.isEditarTrabajador = true;
      this.nuevoEditarTrabajadorVars.mostrarModal = true;
      this.trabajadorItem = trabajador;
    },
    editarGasto: (gasto: Gasto) => {
      this.isEditarGasto = true;
      this.nuevoEditarGastosVars.mostrarModal = true;
      this.gastoItem = gasto;
    },
    cerrarModal: () => {
      this.nuevoEditaractividades.mostrarModal = false;
    },
    
  }

  service = {
    obtenerTipoActividadPorUsuario: () => {
      let params: ObtenerTipoActividadPorUsuarioRequest = {
        idUsuario:  this.idUsuarioStorage
      }
      return lastValueFrom(this.combosService.obtenerTipoActividadPorUsuario(params));
    },
    agregarActividad: () => {
      this.listaTrabajadoresRequestDTO = [];
      this.trabajadores.forEach(item => {
        let ab: TrabajadorDTO = {
          descripcionTrabajador: item.descripcion,
          cantidadTrabajador: item.cantidad,
          costoUnitario: item.costoUnitario,
          costoTotal: item.costoTotal,
          idTipoTrabajador: item.idTipoTrabajador,
        }
        this.listaTrabajadoresRequestDTO.push(ab);
      });

      this.listaGastosRequestDTO = [];
      this.gastos.forEach(item => {
        let cd: GastoDTO = {
          descripcionGasto: item.descripcion,
          cantidadGasto: item.cantidad,
          costoUnitario: item.costoUnitario,
          costoTotal: item.costoTotal,
          idTipoGasto: item.idTipoGasto
        };
        this.listaGastosRequestDTO.push(cd);
      });

      let params: AgregarActividadTrabajadorRequest = {
        fechaActividad: this.form.controls["fecha"].value,
        descripcionActividad: this.form.controls["descripcion"].value.trim(),
        idTipoActividad: this.form.controls["actividad"].value,
        idCampania: parseInt(this.idCampania),
        usuarioInserta: this.nombreUsuarioStorage,
        listaTrabajadores: this.listaTrabajadoresRequestDTO,
        listaGastos: this.listaGastosRequestDTO,

        listaAbonacion: [],
        listaFumigacionDetalle: [],

        cantidadSemillaActividad: null,
        unidadSemilla: null,

        cantidadFumigacion: null,
        unidadFumigacion:null
      };
      return lastValueFrom(this.actividadService.agregarActividadTrabajadorGastos(params));
    },
    editarActividad: () => {
      this.listaTrabajadoresModificaRequestDTO = [];
      this.trabajadores.forEach(item => {
        let ab: TrabajadorModificarDTO = {
          idTrabajador: item.idTrabajador,
          descripcionTrabajador: item.descripcion,
          cantidadTrabajador: item.cantidad,
          costoUnitario: item.costoUnitario,
          costoTotal: item.costoTotal,
          idTipoTrabajador: item.idTipoTrabajador,
        }
        this.listaTrabajadoresModificaRequestDTO.push(ab);
      });

      this.listaGastosModificaRequestDTO = [];
      this.gastos.forEach(item => {
        let cd: GastoTrabajadorModificarDTO = {
          idGasto: item.idGasto,
          descripcionGasto: item.descripcion,
          cantidadGasto: item.cantidad,
          costoUnitario: item.costoUnitario,
          costoTotal: item.costoTotal,
          idTipoGasto: item.idTipoGasto
        };
        this.listaGastosModificaRequestDTO.push(cd);
      });
      let params: ModificarActividadTrabajadorGastosRequest = {
        idActividad: this.item.idActividad,
        fechaActividad: this.form.controls["fecha"].value,
        descripcionActividad: this.form.controls["descripcion"].value.trim(),
        idTipoActividad: this.form.controls["actividad"].value,
        idCampania: parseInt(this.idCampania),
        usuarioModifica: this.nombreUsuarioStorage,
        listaTrabajador: this.listaTrabajadoresModificaRequestDTO,
        listaGasto: this.listaGastosModificaRequestDTO,

        listaAbonacion: [],
        listaFumigacionDetalle: [],

        cantidadSemillaActividad: null,
        unidadSemilla: null,

        cantidadFumigacion: null,
        unidadFumigacion:null
      }
      return lastValueFrom(this.actividadService.modificarActividadTrabajadorGastos(params));
    },
    obtenerActividad:() => {
      let params: ListarDetalleActividadRequest = {
        idActividad: this.item.idActividad
      };
      return lastValueFrom(this.actividadService.listarDetalleActividad(params))
    }
  }


}
