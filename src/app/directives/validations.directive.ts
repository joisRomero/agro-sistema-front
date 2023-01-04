import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  REGEXP_TO_ALL_CHARACTERS_DIRECTIVE,
  REGEXP_TO_ONLY_DATES_DIRECTIVE,
  REGEXP_TO_ONLY_DECIMALS_DIRECTIVE,
  REGEXP_TO_ONLY_LETTERS_DIRECTIVE,
  REGEXP_TO_ONLY_LETTERS_NUMBERS_DIRECTIVE,
  REGEXP_TO_ONLY_NUMBERS_DIRECTIVE
} from '../constants/main.constants';

@Directive({
  selector: '[numbersOnly]'
})
export class OnlyNumbersDirective {
  @Input() numbersOnly?: boolean;
  constructor(private _el: NgControl) { }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    var value = this.numbersOnly;
    const initialValue = this._el.control!.value;
    if (value == true) {
      var positionCursor = event.srcElement.selectionStart;
      this._el.control!.patchValue(event.target.value.replace(REGEXP_TO_ONLY_NUMBERS_DIRECTIVE, ''));
      if (this._el.control!.value == initialValue) {
        event.srcElement.selectionEnd = positionCursor
      }
      else {
        event.srcElement.selectionEnd = positionCursor - 1
      }
    }
  }
}

@Directive({
  selector: '[decimalsOnly]'
})
export class OnlyDecimalsDirective {
  @Input() decimalsOnly?: boolean;
  constructor(private _el: NgControl) { }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    var value = this.decimalsOnly;
    const initialValue = this._el.control!.value;
    var positionCursor = event.srcElement.selectionStart;
    if (value == true) {
      this._el.control!.patchValue(event.target.value.replace(REGEXP_TO_ONLY_DECIMALS_DIRECTIVE, ''));
      if (this._el.control!.value.split(".").length - 1 > 1) {
        var number1: string, number2: string;
        if (positionCursor - 1 <= this._el.control!.value.split(".")[0].length) {
          number1 = this._el.control!.value.split(".")[0] + "." + this._el.control!.value.split(".")[1];
          number2 = this._el.control!.value.split(".")[2]
          this._el.control!.setValue(number1 + number2);
        } else {
          number1 = this._el.control!.value.split(".")[0];
          number2 = this._el.control!.value.split(".")[1] + "." + this._el.control!.value.split(".")[2]
          this._el.control!.setValue(number1 + number2);
        }
      }
      if (this._el.control!.value == initialValue) {
        event.srcElement.selectionEnd = positionCursor
      }
      else {
        event.srcElement.selectionEnd = positionCursor - 1
      }
    }
  }
}

@Directive({
  selector: '[lettersOnly]'
})
export class OnlyLettersDirective {
  @Input() lettersOnly?: boolean;
  constructor(private _el: NgControl) { }
  @HostListener('input', ['$event.target.value']) onInputChange(event: any) {
    var value = this.lettersOnly;
    if (value == true) {
      const initalValue = this._el.control!.value;
      this._el.control!.patchValue(event.replace(REGEXP_TO_ONLY_LETTERS_DIRECTIVE, ''));
    }
  }
}

@Directive({
  selector: '[allCharacters]'
})
export class AllCharactersDirective {
  @Input() allCharacters?: boolean;
  constructor(private _el: NgControl) { }
  @HostListener('input', ['$event.target.value']) onInputChange(event: any) {
    var value = this.allCharacters;
    if (value == true) {
      const initalValue = this._el.control!.value;
      this._el.control!.patchValue(event.replace(REGEXP_TO_ALL_CHARACTERS_DIRECTIVE, ''));
    }
  }
}

@Directive({
  selector: '[datesOnly]'
})
export class OnlyDatesDirective {
  @Input() datesOnly?: boolean;
  constructor(private _el: NgControl) { }
  @HostListener('input', ['$event.target.value']) onInputChange(event: any) {
    let value = this.datesOnly;

    if (value == true) {
      const initalValue = this._el.control!.value;
      this._el.control!.patchValue(event.replace(REGEXP_TO_ONLY_DATES_DIRECTIVE, ''));
    }
  }
}

@Directive({
  selector: '[lettersNumbersOnly]'
})
export class OnlyLettersNumbersDirective {
  @Input() lettersNumbersOnly?: boolean;
  constructor(private _el: NgControl) { }
  @HostListener('input', ['$event.target.value']) onInputChange(event: any) {
    let value = this.lettersNumbersOnly;

    if (value == true) {
      const initalValue = this._el.control!.value;
      this._el.control!.patchValue(event.replace(REGEXP_TO_ONLY_LETTERS_NUMBERS_DIRECTIVE, ''));
    }
  }
}
