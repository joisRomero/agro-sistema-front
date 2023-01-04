import { FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-general-checkbox',
  templateUrl: './general-checkbox.component.html',
  styleUrls: ['./general-checkbox.component.scss']
})

export class GeneralCheckboxComponent implements OnInit {

  @Input() public label: string = '';
  @Input() public fGroup?: FormGroup;
  @Input() public nombreControl?: string;
  @Input() public texto?: string;
  @Input() public value?: string;
  @Input() public presionado: boolean = false;

  public control: any;
  public esRequerido: boolean = false;
  public hayErrores: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if(this.fGroup){
      this.control = this.fGroup!.controls[`${this.nombreControl}`];
    }
    this.onChange();
    this.presionado = this.control.value;
  }

  onChange() {
    this.fGroup!.controls[`${this.nombreControl}`].valueChanges.subscribe(
      () => {
        this.cdRef.detectChanges();
        this.hayErrores = this.control.errors;
      }
    )
  }

  cambioEstado() {
    if (this.presionado) {
      this.presionado = false;
    } else {
      this.presionado = true;
    }

  }

}
