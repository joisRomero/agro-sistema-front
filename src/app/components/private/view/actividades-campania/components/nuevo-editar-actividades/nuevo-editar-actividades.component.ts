import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-nuevo-editar-actividades',
  templateUrl: './nuevo-editar-actividades.component.html',
  styleUrls: ['./nuevo-editar-actividades.component.scss']
})
export class NuevoEditarActividadesComponent implements OnInit {

  public form!: FormGroup;
  @Input() isEditarActividad: boolean = false;
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
  public valoresTipoActividad: GeneralSelectItem[] = [];
  public verMensajeSinDatosTrabajadores: boolean = true;
  public verMensajeSinDatosGastos: boolean = true;

  constructor(
    public fb: FormBuilder,
    public nuevoEditarTrabajadorVars: NuevoEditarTrabajadorVars,
    public nuevoEditarGastosVars: NuevoEditarGastosVars,
    public nuevoEditaractividades: NuevoEditarActividadVars,
    public combosService: CombosService
  ) { }

  ngOnInit(): void {
    this.initialControls();
    this.iniciarCombos();
  }

  private initialControls() {
    this.form = this.fb.nonNullable.group({
      actividad: ["", Validators.required],
      fecha: ["", Validators.required],
      descripcion: [""]
    });
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

    } else {

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
    }
  }

  service = {
    obtenerTipoActividadPorUsuario: () => {
      let params: ObtenerTipoActividadPorUsuarioRequest = {
        idUsuario:  this.idUsuarioStorage
      }
      return lastValueFrom(this.combosService.obtenerTipoActividadPorUsuario(params));
    }
  }


}
