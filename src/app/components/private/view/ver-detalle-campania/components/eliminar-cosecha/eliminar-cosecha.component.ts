import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EliminarCosechaVars } from './eliminar-cosecha.vars';
import { GeneralAlertInformationVars } from 'src/app/components/shared/general-alert-information/general-alert-information.vars';

@Component({
  selector: 'app-eliminar-cosecha',
  templateUrl: './eliminar-cosecha.component.html',
  styleUrls: ['./eliminar-cosecha.component.scss']
})
export class EliminarCosechaComponent implements OnInit {

   @Output() elimino = new EventEmitter();

  constructor(
    public servicioAlert: EliminarCosechaVars,
    public alertInformationService: GeneralAlertInformationVars
  ) {}

  ngOnInit(): void {}

  private service = {
    eliminar: () => {

    },
  };

  onClick = {
    cerrarAlert: () => {
      this.servicioAlert.mostrarModal = false;
    },
    eliminar: async () => {
      // let response = await this.service.eliminar();
      this.servicioAlert.mostrarModal = false;
      this.elimino.emit();
      this.alertInformationService.mostrar = true;
      this.alertInformationService.titulo = "Cosecha";
      this.alertInformationService.texto = "Se eliminó la cosecha exitosamente";
    },
  };
}
