import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-sin-datos',
  templateUrl: './general-sin-datos.component.html',
  styleUrls: ['./general-sin-datos.component.scss']
})
export class GeneralSinDatosComponent {

  @Input() texto: string = 'No se encontraron datos';
}
