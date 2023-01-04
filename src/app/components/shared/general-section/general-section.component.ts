import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-section',
  templateUrl: './general-section.component.html',
  styleUrls: ['./general-section.component.scss']
})
export class GeneralSectionComponent implements OnInit {

  @Input() titulo: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
