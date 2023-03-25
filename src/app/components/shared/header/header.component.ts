import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, Routes } from '@angular/router';
import { privateModuleRoutes } from '../../private/private-routing.module';
import { SidebarVars } from '../sidebar/sidebar.component.vars';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public sidebarVars: SidebarVars,
  ) {}

  ngOnInit(): void {
  }

  onClickNavButton() {
    this.sidebarVars.mostrarSidebar = !this.sidebarVars.mostrarSidebar;
  }


}
