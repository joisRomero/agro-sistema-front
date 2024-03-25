import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgregarCosechaVars } from './agregar-cosecha.vars';
import { Cosecha } from 'src/app/models/cosecha';
import { Paginacion } from 'src/app/models/paginacion';
import { AgregarDetalleCosechaVars } from '../agregar-detalle-cosecha/agregar-detalle-cosecha.vars';

@Component({
  selector: 'app-agregar-editar-cosecha',
  templateUrl: './agregar-editar-cosecha.component.html',
  styleUrls: ['./agregar-editar-cosecha.component.scss']
})
export class AgregarEditarCosechaComponent implements OnInit {

  @Input() esEditar: boolean = false;

  public tituloModal: string = 'Agregar cosecha';
  public form!: FormGroup;
  public cosechaItem!: Cosecha;
  public cosechaTabla: Cosecha[] = [];
  public cosechas: Cosecha[] = [];
  public verMensajeSinDatosCosechas: boolean = true;
  public isEditarCosecha: boolean = false;
  @Input() verDetalle: boolean = false;
  
  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    public servicioModal: AgregarCosechaVars,
    private fb: FormBuilder,
    public servicioModalCosecha: AgregarDetalleCosechaVars,
  ) { }

  ngOnInit(): void {
    this.iniciarControles();
    if(this.esEditar) {
      this.tituloModal = "Editar cosecha"
    } else {
      this.tituloModal = "Agregar cosecha"
    }
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      fecha: ["", [Validators.required]],
      descripcion: [""]
    })
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

    } else {

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
    
  }

}
