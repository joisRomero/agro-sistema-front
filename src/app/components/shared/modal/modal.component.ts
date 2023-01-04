import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() titulo: string = "";
  @Input() public cerrarModal?: () => void;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
