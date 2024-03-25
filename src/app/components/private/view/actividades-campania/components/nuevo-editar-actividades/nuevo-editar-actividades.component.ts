import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { AbonacionDTO, AgregarActividadTrabajadorRequest, FumigacionDetalleDTO, GastoDTO, TrabajadorDTO } from 'src/app/models/requests/agregarActividadTrabajadorRequest';
import { ActividadService } from 'src/app/services/actividad.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { ListarDetalleActividadRequest } from 'src/app/models/requests/listarDetalleActividadRequest';
import { ListaPaginaActividadResponseItem } from 'src/app/models/responses/listaPaginaActividadResponse';
import { Convert } from 'src/app/utils/convert';
import { ModificarTipoActividadRequest } from 'src/app/models/requests/modificarTipoActividadRequest';
import { AbonacionModificarDTO, FumigacionDetalleModificarDTO, GastoTrabajadorModificarDTO, ModificarActividadTrabajadorGastosRequest, TrabajadorModificarDTO } from 'src/app/models/requests/modificarActividadTrabajadorGastosRequest';
import { EliminarActividadVars } from '../aler-eliminar-actividad/eliminar-actividad-vars';
import { Abono } from 'src/app/models/abono';
import { NuevoEditarAbonacionVars } from '../../../abonacion/components/agregar-editar-abonacion/nuevo-editar-abonacion-vars';
import { Fumigacion } from 'src/app/models/fumigacion';
import { NuevoEditarFumigacionVars } from '../../../fumigacion/components/nuevo-editar-fumigacion/nuevo-editar-fumigacion-vars';

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
  public isEditarAbono: boolean = false;
  public isEditarFumigacion: boolean = false;
  public trabajadores: Trabajador[] = [];
  public gastos: Gasto[] = [];
  public trabajadoresTabla: Trabajador[] = [];
  public gastosTabla: Gasto[] = [];
  public abonos: Abono[] = [];
  public abonoTabla: Abono[] = [];
  public fumigacion: Fumigacion[] = [];
  public fumigacionTabla: Fumigacion[] = [];
  public mensajesError = {
    actividad: "El campo es obligatorio.",
    fecha: "El campo es obligatorio.",
  }
  public trabajadorItem!: Trabajador;
  public gastoItem!: Gasto;
  public abonoItem!: Abono;
  public fumigacionItem!: Fumigacion;
  private idUsuarioStorage: number = parseInt((JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario);
  private nombreUsuarioStorage: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public valoresTipoActividad: GeneralSelectItem[] = [];
  public valoresUnidadFumigacion: GeneralSelectItem[] = [];
  public valoresUnidadSemillas: GeneralSelectItem[] = [];
  public verMensajeSinDatosTrabajadores: boolean = true;
  public verMensajeSinDatosGastos: boolean = true;
  public verMensajeSinDatosAbono: boolean = true;
  public verMensajeSinDatosFumigacion: boolean = true;
  public listaTrabajadoresRequestDTO: TrabajadorDTO[] = [];
  public listaGastosRequestDTO: GastoDTO[] = [];
  public listaAbonacionRequestDTO: AbonacionDTO[] = [];
  public listaFumigacionRequestDTO: FumigacionDetalleDTO[] = [];
  public listaTrabajadoresModificaRequestDTO: TrabajadorModificarDTO[] = [];
  public listaGastosModificaRequestDTO: GastoTrabajadorModificarDTO[] = [];
  public listaAbonosModificaRequestDTO: AbonacionModificarDTO[] = [];
  public listaFumigacionModificaRequestDTO: FumigacionDetalleModificarDTO[] = [];
  public tituloModal: string = '';
  @Input() item!: ListaPaginaActividadResponseItem;
  @Input() verDetalle: boolean = false;
  public tipoActividadSeleccion:number = 0;

  constructor(
    public fb: FormBuilder,
    public nuevoEditarTrabajadorVars: NuevoEditarTrabajadorVars,
    public nuevoEditarGastosVars: NuevoEditarGastosVars,
    public nuevoEditaractividades: NuevoEditarActividadVars,
    public nuevoEditarAbonoVars: NuevoEditarAbonacionVars,
    public nuevoEditarFumigacionVars: NuevoEditarFumigacionVars,
    public combosService: CombosService,
    public actividadService: ActividadService,
    private alertInformationService: GeneralAlertInformationVars,
    private cdRef: ChangeDetectorRef,
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
      this.changeActividad();
      this.form.controls["fecha"].setValue(Convert.dateToDateInput(response.body!.fechaActividad));
      this.form.controls["descripcion"].setValue(response.body!.descripcionActividad);
      // this.form.controls["cantidadSemilla"].setValue(response.body!.);
      // this.form.controls["unidadSemilla"].setValue(response.body!.descripcionActividad);
      this.form.controls["cantidadFumigacion"].setValue(response.body!.cantidadFumigacion);
      this.form.controls["unidadFumigacion"].setValue(response.body!.unidadDatoComunFumigacion);

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
          descripcionTipoGasto: item.nombreTipoGasto,
          numero: index+1
        }
        this.gastos.push(cd)
      });

      this.fumigacion = [];
      response.body!.listaDetalleFumigacionDetalle?.forEach((item, index) => {
        let fg: Fumigacion = {
          idFumigacion: item.idFumigacionDetalle,
          cantidad: item.cantidadFumigacionDetalle,
          descripcionAgroquimico: "",
          idAgroquimico: item.idAgroQuimico,
          numero: index+1,
          unidad: item.unidadDatoComunFumigacionDetalle,
          unidadDescripcion: item.unidadDescripcionFumigacionDetalle
        }
        this.fumigacion.push(fg);
      })

      this.abonos = [];
      response.body!.listaDetalleAbonacion?.forEach((item, index) => {
        let abo: Abono = {
          idAbono: item.idAbonacion,
          numero: index+1,
          idTipoAbono: item.idAbono,
          descripcionTipoAbono: "",
          cantidad: item.cantidadAbonacion,
          unidad: item.unidadDatoComunAbonacion,
          unidadDescripcion: item.unidadDescripcionAbonacion
        }
        this.abonos.push(abo);
      })
      
      this.buscarTrabajadores();
      this.buscarGastos();
      this.buscarFumigacion();
      this.buscarAbonos();

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
    (async () => {
      this.valoresUnidadFumigacion = [];
      let response = await this.service.obtenerUnidadFumigacion();
      response.body!.forEach(e => {
        this.valoresUnidadFumigacion.push(new GeneralSelectItem(e.codigoUnidadFumigacion, e.descripcionLarga));
      })
    })();
    (async () => {
      this.valoresUnidadSemillas = [];
      let response = await this.service.obtenerUnidadSemilla();
      response.body!.forEach(e => {
        this.valoresUnidadSemillas.push(new GeneralSelectItem(e.codigoUnidadSemilla, e.descripcionLarga));
      })
    })();
  }

  changeActividad(){
    this.tipoActividadSeleccion = this.form.controls["actividad"].value;

    if(this.tipoActividadSeleccion == 3) {
      this.form.controls["actividad"].setValidators([Validators.required]);
      this.form.controls["fecha"].setValidators([Validators.required]);
      this.form.controls["descripcion"].clearValidators();
      this.form.controls["descripcion"].updateValueAndValidity();
      this.form.controls["unidadSemilla"].setValidators([Validators.required]);
      this.form.controls["cantidadSemilla"].setValidators([Validators.required]);
      this.form.controls["cantidadFumigacion"].clearValidators();
      this.form.controls["cantidadFumigacion"].updateValueAndValidity();
      this.form.controls["unidadFumigacion"].clearValidators();
      this.form.controls["unidadFumigacion"].updateValueAndValidity();
    } else if(this.tipoActividadSeleccion == 1) {
      this.form.controls["actividad"].setValidators([Validators.required]);
      this.form.controls["fecha"].setValidators([Validators.required]);
      this.form.controls["descripcion"].clearValidators();
      this.form.controls["descripcion"].updateValueAndValidity();
      this.form.controls["cantidadSemilla"].clearValidators();
      this.form.controls["cantidadSemilla"].updateValueAndValidity();
      this.form.controls["unidadSemilla"].clearValidators();
      this.form.controls["unidadSemilla"].updateValueAndValidity();
      this.form.controls["cantidadFumigacion"].setValidators([Validators.required]);
      this.form.controls["unidadFumigacion"].setValidators([Validators.required]);
    } else {
      this.form.controls["actividad"].setValidators([Validators.required]);
      this.form.controls["fecha"].setValidators([Validators.required]);
      this.form.controls["descripcion"].clearValidators();
      this.form.controls["descripcion"].updateValueAndValidity();
      this.form.controls["cantidadSemilla"].clearValidators();
      this.form.controls["cantidadSemilla"].updateValueAndValidity();
      this.form.controls["unidadSemilla"].clearValidators();
      this.form.controls["unidadSemilla"].updateValueAndValidity();
      this.form.controls["cantidadFumigacion"].clearValidators();
      this.form.controls["cantidadFumigacion"].updateValueAndValidity();
      this.form.controls["unidadFumigacion"].clearValidators();
      this.form.controls["unidadFumigacion"].updateValueAndValidity();
    }
    this.form.updateValueAndValidity();
    this.cdRef.detectChanges();
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

  public paginacionAbonosVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionAbonosVars.paginaActual = paginaActual;
      this.buscarAbonos();
    }
  }

  public paginacionFumigacionVars: Paginacion = {
    paginaActual: 1,
    totalPaginas: 0,
    totalFilas: 0,
    onChangePage: (paginaActual: any) => {
      this.paginacionFumigacionVars.paginaActual = paginaActual;
      this.buscarFumigacion();
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

  public async buscarAbonos() {
    this.abonoTabla = [];
    const elementosPorPagina = 10;  
    const inicio = (this.paginacionAbonosVars.paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    this.abonoTabla = this.abonos.slice(inicio, fin);
    this.paginacionAbonosVars.totalFilas = this.abonos.length;
    this.paginacionAbonosVars.totalPaginas = Math.ceil(this.abonos.length / 10);
    this.verMensajeSinDatosAbono = this.abonos.length == 0;
  }

  public async buscarFumigacion() {
    this.fumigacionTabla = [];
    const elementosPorPagina = 10;  
    const inicio = (this.paginacionFumigacionVars.paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    this.fumigacionTabla = this.fumigacion.slice(inicio, fin);
    this.paginacionFumigacionVars.totalFilas = this.fumigacion.length;
    this.paginacionFumigacionVars.totalPaginas = Math.ceil(this.fumigacion.length / 10);
    this.verMensajeSinDatosFumigacion = this.fumigacion.length == 0;
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

  public obtenerAbono(abono: Abono){
    if(this.isEditarAbono){
      this.abonos[abono.numero - 1] = abono;
    } else {
      let abonob : Abono = {
        idAbono: null,
        numero: this.abonos.length + 1,
        idTipoAbono: abono.idTipoAbono,
        descripcionTipoAbono: abono.descripcionTipoAbono,
        cantidad: abono.cantidad,
        unidad: abono.unidad,
        unidadDescripcion: abono.unidadDescripcion
      };
      this.abonos.push(abonob);
    }
    this.buscarAbonos();
  }

  public obtenerFumigacion(fumigacion: Fumigacion){
    if(this.isEditarFumigacion){
      this.fumigacion[fumigacion.numero - 1] = fumigacion;
    } else {
      let fumigacionb : Fumigacion = {
        idFumigacion: null,
        numero: this.fumigacion.length + 1,
        idAgroquimico: fumigacion.idAgroquimico,
        descripcionAgroquimico: fumigacion.descripcionAgroquimico,
        cantidad: fumigacion.cantidad,
        unidad: fumigacion.unidad,
        unidadDescripcion: fumigacion.unidadDescripcion
      };
      this.fumigacion.push(fumigacionb);
    }
    this.buscarFumigacion();
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
    agregarAbono: () => {
      this.isEditarAbono = false;
      this.nuevoEditarAbonoVars.mostrarModal = true;
    },
    agregarFumigacion: () => {
      this.isEditarFumigacion = false;
      this.nuevoEditarFumigacionVars.mostrarModal = true;
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
    eliminarAbono: (abono: Abono) => {
      this.abonos = this.abonos.filter(objeto => objeto.numero !== abono.numero);
      let abonoB: Abono[] = []
      for (let index = 0; index < this.abonos.length; index++) {
        const element = this.abonos[index];
        element.numero = index + 1;
        abonoB.push(element);
      }
      this.buscarAbonos();
    },
    eliminarFumigacion: (abono: Fumigacion) => {
      this.abonos = this.abonos.filter(objeto => objeto.numero !== abono.numero);
      let abonoB: Abono[] = []
      for (let index = 0; index < this.abonos.length; index++) {
        const element = this.abonos[index];
        element.numero = index + 1;
        abonoB.push(element);
      }
      this.buscarAbonos();
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
    editarAbono: (abono: Abono) => {
      this.isEditarAbono = true;
      this.nuevoEditarAbonoVars.mostrarModal = true;
      this.abonoItem = abono;
    },
    editarFumgiacion: (fumigacion: Fumigacion) => {
      this.isEditarFumigacion = true;
      this.nuevoEditarFumigacionVars.mostrarModal = true;
      this.fumigacionItem = fumigacion;
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
      this.tipoActividadSeleccion = this.form.controls["actividad"].value;
      let cantidadSemillaActividad = null;
      let unidadSemilla = null;
      let cantidadFumigacion = null;
      let unidadFumigacion = null;

      this.listaTrabajadoresRequestDTO = [];
      this.trabajadores.forEach(item => {
        let tb: TrabajadorDTO = {
          descripcionTrabajador: item.descripcion,
          cantidadTrabajador: item.cantidad,
          costoUnitario: item.costoUnitario,
          costoTotal: item.costoTotal,
          idTipoTrabajador: item.idTipoTrabajador,
        }
        this.listaTrabajadoresRequestDTO.push(tb);
      });

      this.listaGastosRequestDTO = [];
      this.gastos.forEach(item => {
        let gt: GastoDTO = {
          descripcionGasto: item.descripcion,
          cantidadGasto: item.cantidad,
          costoUnitario: item.costoUnitario,
          costoTotal: item.costoTotal,
          idTipoGasto: item.idTipoGasto
        };
        this.listaGastosRequestDTO.push(gt);
      });

      if(this.tipoActividadSeleccion == 3){
        cantidadSemillaActividad = this.form.controls["cantidadSemilla"].value;
        unidadSemilla = this.form.controls["unidadSemilla"].value;
      }

      if(this.tipoActividadSeleccion == 2){
        this.listaFumigacionRequestDTO = [];
        
        this.listaAbonacionRequestDTO = [];
        this.abonos.forEach(item => {
          let ab: AbonacionDTO = {
            cantidadAbonacion: item.cantidad,
            unidadAbonacion: item.unidad,
            idAbono: item.idTipoAbono
          }
          this.listaAbonacionRequestDTO.push(ab);
        })
      }

      if(this.tipoActividadSeleccion == 1){
        this.listaAbonacionRequestDTO = [];

        cantidadFumigacion = this.form.controls["cantidadFumigacion"].value
        unidadFumigacion = this.form.controls["unidadFumigacion"].value

        this.listaFumigacionRequestDTO = [];
        this.fumigacion.forEach(item => {
          let fg:FumigacionDetalleDTO = {
            cantidadFumigacionDetalle: item.cantidad,
            unidadFumigacionDetalle: item.unidad,
            idAgroquimico: item.idAgroquimico
          }
          this.listaFumigacionRequestDTO.push(fg);
        })
      }

      let params: AgregarActividadTrabajadorRequest = {
        fechaActividad: this.form.controls["fecha"].value,
        descripcionActividad: this.form.controls["descripcion"]!.value.trim(),
        idTipoActividad: this.form.controls["actividad"].value,
        idCampania: parseInt(this.idCampania),
        usuarioInserta: this.nombreUsuarioStorage,
        listaTrabajadores: this.listaTrabajadoresRequestDTO,
        listaGastos: this.listaGastosRequestDTO,
        listaAbonacion: this.listaAbonacionRequestDTO,
        listaFumigacionDetalle: this.listaFumigacionRequestDTO,
        cantidadSemillaActividad: cantidadSemillaActividad,
        unidadSemilla: unidadSemilla,
        cantidadFumigacion: cantidadFumigacion,
        unidadFumigacion:unidadFumigacion
      };


      return lastValueFrom(this.actividadService.agregarActividadTrabajadorGastos(params));
    },
    editarActividad: () => {
      this.tipoActividadSeleccion = this.form.controls["actividad"].value;
      let cantidadSemillaActividad = null;
      let unidadSemilla = null;
      let cantidadFumigacion = null;
      let unidadFumigacion = null;
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

      if(this.tipoActividadSeleccion == 3){
        cantidadSemillaActividad = this.form.controls["cantidadSemilla"].value;
        unidadSemilla = this.form.controls["unidadSemilla"].value;
      }

      if(this.tipoActividadSeleccion == 2){
        this.listaFumigacionModificaRequestDTO = [];
        
        this.listaAbonosModificaRequestDTO = [];
        this.abonos.forEach(item => {
          let ab: AbonacionModificarDTO = {
            idAbonacion: item.idAbono,
            cantidadAbonacion: item.cantidad,
            unidadAbonacion: item.unidad,
            idAbono: item.idTipoAbono
          }
          this.listaAbonosModificaRequestDTO.push(ab);
        })
      }

      if(this.tipoActividadSeleccion == 1){
        this.listaAbonosModificaRequestDTO = [];

        cantidadFumigacion = this.form.controls["cantidadFumigacion"].value
        unidadFumigacion = this.form.controls["unidadFumigacion"].value
        this.listaFumigacionModificaRequestDTO = [];
        this.fumigacion.forEach(item => {
          let fg:FumigacionDetalleModificarDTO = {
            idFumigacionDetalle: item.idFumigacion,
            cantidadFumigacionDetalle: item.cantidad,
            unidadFumigacionDetalle: item.unidad,
            idAgroquimico: item.idAgroquimico
          }
          this.listaFumigacionModificaRequestDTO.push(fg);
        })
      }

      let params: ModificarActividadTrabajadorGastosRequest = {
        idActividad: this.item.idActividad,
        fechaActividad: this.form.controls["fecha"].value,
        descripcionActividad: this.form.controls["descripcion"]!.value.trim(),
        idTipoActividad: this.form.controls["actividad"].value,
        idCampania: parseInt(this.idCampania),
        usuarioModifica: this.nombreUsuarioStorage,
        listaTrabajador: this.listaTrabajadoresModificaRequestDTO,
        listaGasto: this.listaGastosModificaRequestDTO,
        listaAbonacion: this.listaAbonosModificaRequestDTO,
        listaFumigacionDetalle: this.listaFumigacionModificaRequestDTO,
        cantidadSemillaActividad: cantidadSemillaActividad,
        unidadSemilla: unidadSemilla,
        cantidadFumigacion: cantidadFumigacion,
        unidadFumigacion:unidadFumigacion
      }
      return lastValueFrom(this.actividadService.modificarActividadTrabajadorGastos(params));
    },
    obtenerActividad:() => {
      let params: ListarDetalleActividadRequest = {
        idActividad: this.item.idActividad
      };
      return lastValueFrom(this.actividadService.listarDetalleActividad(params))
    },
    obtenerUnidadFumigacion: () => {
      return lastValueFrom(this.combosService.obtenerUnidadFumigacion());
    },
    obtenerUnidadSemilla: () => {
      return lastValueFrom(this.combosService.obtenerUnidadSemilla());
    }
  }


}
