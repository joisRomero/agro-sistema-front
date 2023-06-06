import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-button',
  templateUrl: './general-button.component.html',
  styleUrls: ['./general-button.component.scss']
})
export class GeneralButtonComponent implements OnInit {

  @Input() tipo: string = "button";
  @Input() esDisable: boolean = false;
  @Input() esSmall: boolean = false;
  @Input() esSecundario: boolean = false;
  @Input() claseBoton: string = "";
  @Input() nombreIcono: string = "";
  @Input() label?: string = "";
  @Input() sinClasesDeBoton: boolean = false;
  @Input() onClickButton?: () => void;


  constructor() { }

  ngOnInit(): void {
    if(this.esSecundario){
      this.claseBoton = `btn btn-outline-${this.claseBoton}`;
    } else if(this.sinClasesDeBoton){
      this.claseBoton = this.claseBoton;
    } else {
      this.claseBoton = `btn btn-${this.claseBoton}`;
    }
  }

}
