import { Cultivo } from './../../../../models/cultivo';
import { IdCultivo } from './../../../../models/id-cultivo';
import { AlertEliminarService } from './components/alert-eliminar/alert-eliminar.service';
import { ListaCultivosResponse } from './../../../../models/responses/lista-cultivos-response';
import { ModalNuevoEditarCultivoService } from './components/modal-nuevo-editar-cultivo/modal-nuevo-editar-cultivo.service';
import { Component, OnInit } from '@angular/core';
import { CultivoService } from 'src/app/services/cultivo.service';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cultivo',
  templateUrl: './cultivo.component.html',
  styleUrls: ['./cultivo.component.scss']
})
export class CultivoComponent implements OnInit {

  public isEditar: boolean = false;
  public nombre: string = '';
  public itemsTabla: ListaCultivosResponse[] = [];
  public idCultivo!: number;
  public cultivoItem!: Cultivo;
  public form!: FormGroup;

  constructor(
    public modalNuevoEditarCultivoService: ModalNuevoEditarCultivoService,
    public cultivoService: CultivoService,
    public alertEliminarService: AlertEliminarService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buscar();
    this.initialControls();
  }

  private initialControls() {
    this.form = this.fb.nonNullable.group({
      nombre: [""]
    });
  }

  private async buscar() {
    let response = await this.service.obtenerListaCultivos();
    this.itemsTabla = response.body!;
  }

  private service = {
    obtenerListaCultivos: () => {
      return lastValueFrom(this.cultivoService.obtenerListaCultivos());
    },
    obtenerCultivoPorId: () => {
      let params: IdCultivo = {
        id: this.idCultivo
      }
      return lastValueFrom(this.cultivoService.obtenerPorId(params));
    }
  }

  public onClick = {
    nuevoCultivo: () => {
      this.isEditar = false;
      this.nombre = 'nuevo'
      this.modalNuevoEditarCultivoService.mostrarModal = true;
    },
    editarCultivo: async (idCultivo: number) => {
      this.idCultivo = idCultivo;
      let response = await this.service.obtenerCultivoPorId();
      this.cultivoItem = response.body!;
      this.isEditar = true;
      this.nombre = 'editar'
      this.modalNuevoEditarCultivoService.mostrarModal = true;
    },
    cambiarEstadoCultivo: (idCultivo: number) => {
      this.alertEliminarService.mostrar = true;
      this.idCultivo = idCultivo;
    }
  }

  public actualizarTabla() {
    this.buscar();
  }


}
