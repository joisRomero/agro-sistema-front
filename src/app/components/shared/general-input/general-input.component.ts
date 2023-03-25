import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-input',
  templateUrl: './general-input.component.html',
  styleUrls: ['./general-input.component.scss']
})
export class GeneralInputComponent implements OnInit {

  @Input() public label?: string;
  @Input() public tipo?:string;
  @Input() public fGroup?: FormGroup;
  @Input() public nombreControl?: string;
  @Input() public desabilitado?: boolean;
  @Input() public placeholder?: string;
  @Input() public maxlength?: number;
  @Input() public soloNumeros?: boolean;
  @Input() public soloDecimales?: boolean;
  @Input() public soloLetras?: boolean;
  @Input() public todosLosCaracteres?: boolean;
  @Input() public soloFechas?: boolean;
  @Input() public soloLetrasNumeros?: boolean;
  @Input() public nombreIcono: string = "";
  @Input() public mensajeError?: string;
  @Input() public filas: number = 1;

  @Input() onClickButton?: () => void;


  public control: any;
  public esObligatorio: boolean = false;
  public hayErrores: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.control = this.fGroup!.controls[`${this.nombreControl}`];
    this.onChange();
  }

  ngAfterContentInit() {
    this.esObligatorio = this.control.hasValidator(Validators.required);
    this.hayErrores = this.control.errors;
  }

  ngAfterViewChecked() {
    this.esObligatorio = this.control.hasValidator(Validators.required);
    this.hayErrores = this.control.errors;
  }

  onChange() {
    this.fGroup!.controls[`${this.nombreControl}`].valueChanges.subscribe(
      () => {
        this.cdRef.detectChanges();
        this.hayErrores = this.control.errors;
      }
    )
  }

}
