import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef
} from '@angular/core';


@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {

  // @Output() clickOutside = new EventEmitter<void>();

  @Output()
  clickOutside: EventEmitter<MouseEvent> = new EventEmitter();

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }

  constructor(private elementRef: ElementRef) {}
}
