import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-general-pagination',
  templateUrl: './general-pagination.component.html',
  styleUrls: ['./general-pagination.component.scss']
})
export class GeneralPaginationComponent implements OnInit {

  @Input() public totalFilas: any;
  @Input() public totalPaginas: any;
  @Input() public paginaActual: any = 1;
  @Output() public eventChangePage = new EventEmitter();
  public paginas: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.paginas = [];
    this.setPaginas(this.paginaActual);
  }

  public setPaginas(paginaActual: any) {
    if (this.totalPaginas > 5) {
      if (this.paginaActual === this.totalPaginas) {
        this.paginas = [this.paginaActual - 4, this.paginaActual - 3, this.paginaActual - 2, this.paginaActual - 1, this.paginaActual];
      }
      else if (this.paginaActual === this.totalPaginas - 1) {
        this.paginas = [this.paginaActual - 3, this.paginaActual - 2, this.paginaActual - 1, this.paginaActual, this.paginaActual + 1];
      }
      else if (this.paginaActual === 1) {
        this.paginas = [this.paginaActual, this.paginaActual + 1, this.paginaActual + 2, this.paginaActual + 3, this.paginaActual + 4];
      }
      else if (this.paginaActual === 2) {
        this.paginas = [this.paginaActual - 1, this.paginaActual, this.paginaActual + 1, this.paginaActual + 2, this.paginaActual + 3];
      }
      else {
        this.paginas = [this.paginaActual - 2, this.paginaActual - 1, this.paginaActual, this.paginaActual + 1, this.paginaActual + 2];
      }
    }
    else {
      this.paginas = [];
      for (let pag = 0; pag < this.totalPaginas; pag++) {
        this.paginas.push(pag + 1);
      }
    }
  }

  public seleccionarPagina(pagina: any) {
    if (pagina !== this.paginaActual) {
      this.paginaActual = pagina;
      this.setPaginas(this.paginaActual);
      this.eventChangePage.emit(this.paginaActual);
    }
  }

  public paginaAnterior() {
    if (this.paginaActual !== 1) { this.paginaActual-- }
    this.setPaginas(this.paginaActual)
    this.eventChangePage.emit(this.paginaActual);
  }

  public paginaSiguiente() {
    if (this.paginaActual !== this.totalPaginas) { this.paginaActual++; }
    this.setPaginas(this.paginaActual)
    this.eventChangePage.emit(this.paginaActual);
  }

}
