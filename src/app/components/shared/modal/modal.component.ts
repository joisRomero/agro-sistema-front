import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() titulo: string = "";
  @Input() small: boolean = false;
  @Input() large: boolean = false;
  @Input() extraLarge: boolean = false;
  @Input() public cerrarModal?: () => void;
  public tamanio: number = 500;

  constructor(
  ) { }

  ngOnInit(): void {
    if(this.small){
      this.tamanio = 300;
    }

    if(this.large) {
      this.tamanio = 800;
    }

    if(this.extraLarge) {
      this.tamanio = 1140;
    }
  }

}
