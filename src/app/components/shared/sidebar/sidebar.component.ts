import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { LayoutVars } from '../../private/layout/layout.component.vars';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,AfterViewInit  {

  public items!: Menu[];
  public listaElementos: any

  constructor(
    private layautVars: LayoutVars
  ) {}
  ngAfterViewInit(): void {
    this.listaElementos = document.querySelectorAll('.lista-boton-click');
    this.listaElementos.forEach((listaElemento: any) => {
      listaElemento.addEventListener('click', () => {
        listaElemento.classList.toggle('flecha');
        let heigth = 0;
        let menu = listaElemento.nextElementSibling;
        if(menu.clientHeight == "0"){
          heigth = menu.scrollHeight;
        }
        menu.style.height = `${heigth}px`;
      })
    })
  }

  ngOnInit(): void {
    this.items = this.layautVars.vistas;
  }
}
