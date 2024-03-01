import { Component, OnInit } from '@angular/core';
import { ModalNuevoEditarTipoActividadService } from './components/modal-nuevo-editar-tipo-actividad/modal-nuevo-editar-tipo-actividad.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { AlertEliminarTipoActividadService } from './components/alert-eliminar-tipo-actividad/alert-eliminar.service';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.scss']
})
export class TipoActividadComponent implements OnInit {

  public isEditar: boolean = false;
  public nombre: string = '';
  public form!: FormGroup;
  private idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;


  constructor(
    public servicioModal:ModalNuevoEditarTipoActividadService,
    public fb: FormBuilder,
    public alertEliminarService: AlertEliminarTipoActividadService 
  ) { }

  ngOnInit(): void {
    this.initialControls();
    this.setDatosBusqueda();
    this.buscar();
  }

  buscar() {
    throw new Error('Method not implemented.');
  }
  setDatosBusqueda() {
    throw new Error('Method not implemented.');
  }
  initialControls() {
    throw new Error('Method not implemented.');
  }

}
