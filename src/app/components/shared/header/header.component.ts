import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { privateModuleRoutes } from '../../private/private-routing.module';
import { SidebarVars } from '../sidebar/sidebar.component.vars';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public tituloHeader: string = '';
  public url: string = '';

  public items!: Routes;

  constructor(public vars: SidebarVars, public router: Router) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.items = privateModuleRoutes;
    this.router.events.subscribe(() => {
      this.url = this.router.url;
      this.initConfig();
    });
    this.initConfig();
  }

  onClickNavButton() {
    this.vars.showSidebar = !this.vars.showSidebar;
  }

  initConfig() {
    this.items[0].children!.forEach((el: any) => {
      if (this.url!.includes(el.path)) {
        this.tituloHeader = el.title;
      }
    });
  }
}
