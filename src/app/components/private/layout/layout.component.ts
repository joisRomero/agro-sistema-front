import { Component, OnInit } from '@angular/core';
import { SidebarVars } from '../../shared/sidebar/sidebar.component.vars';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public vars: SidebarVars
  ) { }

  ngOnInit(): void {
  }

  onClickBackground(){
    this.vars.showSidebar = false;
  }

}
