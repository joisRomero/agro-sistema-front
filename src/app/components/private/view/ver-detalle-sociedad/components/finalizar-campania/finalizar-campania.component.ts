import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinalizarCampaniaVars } from './finalizar-campania-vars';
import { Usuario } from 'src/app/models/usuario';
import { lastValueFrom } from 'rxjs';
import { FinalizarCampaniaRequest } from 'src/app/models/requests/finalizarCampaniaRequest';
import { CampaniaService } from 'src/app/services/campania.service';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';
import { Convert } from 'src/app/utils/convert';

@Component({
  selector: 'app-finalizar-campania',
  templateUrl: './finalizar-campania.component.html',
  styleUrls: ['./finalizar-campania.component.scss']
})
export class FinalizarCampaniaComponent implements OnInit {

  public form!: FormGroup;
  @Input() idCampania!: number;
  @Output() actualizo = new EventEmitter();
  private nombreUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).nombreUsuario;
  public fechaLimite: string = "";

  public mensajesError = {
    nombre: "El campo es obligatorio.",
  }

  constructor(
    private fb: FormBuilder,
    public servicioModal: FinalizarCampaniaVars,
    public campaniaService: CampaniaService,
    private alertInformationService: GeneralAlertInformationVars
  ) { }

  ngOnInit(): void {
    this.fechaLimite = Convert.dateToDateInput(new Date());
    this.iniciarControles();
  }

  private iniciarControles() {
    this.form = this.fb.nonNullable.group({
      fechaFin: ["", [Validators.required]],
    });
  }

  async guardar() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }

    let response = await this.service.finalizarCampania();
    this.servicioModal.mostrarModal=false;
    this.alertInformationService.mostrar = true;
    this.alertInformationService.titulo = "Campaña";
    this.alertInformationService.texto = "Campaña finalizada con éxito.";
    this.actualizo.emit();
  }

  onClick = {
    cerrarModal: () => {
      this.servicioModal.mostrarModal = false;
    }
  }
  
  private service = {
    finalizarCampania: () => {
      let params: FinalizarCampaniaRequest = {
        idCampania: this.idCampania,
        fechaFinaliza: this.form.controls["fechaFin"].value,
        usuarioModifica: this.nombreUsuario
      }
      return lastValueFrom(this.campaniaService.finalizarCampania(params));
    },
  }

}
