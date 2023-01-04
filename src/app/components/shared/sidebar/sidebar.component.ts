import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { LayoutVars } from '../../private/layout/layout.component.vars';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public items!: Menu[];
  public isMenuSelectedArray: boolean[] = [];

  constructor(
    private layautVars: LayoutVars
  ) { }

  ngOnInit(): void {
    this.items = this.layautVars.vistas;
  }

}
