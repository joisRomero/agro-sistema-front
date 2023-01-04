import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-alert',
  templateUrl: './general-alert.component.html',
  styleUrls: ['./general-alert.component.scss']
})
export class GeneralAlertComponent implements OnInit {

  @Input() titulo: string = "";
  @Input() public cerrarAlert?: () => void;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
