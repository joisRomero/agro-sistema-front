import { Component, OnInit } from '@angular/core';
import { SidebarVars } from '../../shared/sidebar/sidebar.component.vars';
import { LayautService } from './layaut.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public sidebarVars: SidebarVars,
    public layoutService: LayautService
  ) { }

  ngOnInit(): void {
  }

}
