import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-button',
  templateUrl: './general-button.component.html',
  styleUrls: ['./general-button.component.scss']
})
export class GeneralButtonComponent implements OnInit {

  @Input() tipoBoton: string = "button";
  @Input() esDisable: boolean = false;
  @Input() esSmall: boolean = false;
  @Input() esSecundario: boolean = false;
  @Input() claseBoton: string = "";
  @Input() nombreIcono: string = "";
  @Input() valor?: string = "";
  @Input() onClickButton?: () => void;


  constructor() { }

  ngOnInit(): void {
    if(this.esSecundario){
      this.claseBoton = `btn-outline-${this.claseBoton}`;
    } else {
      this.claseBoton = `btn-${this.claseBoton}`;
    }
  }

}
