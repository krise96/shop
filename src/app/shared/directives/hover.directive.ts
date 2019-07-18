import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {


  @HostBinding('style.borderColor') borderColor;

  @HostListener('mouseenter') hover() {
    this.borderColor = 'yellow';
  }

  @HostListener('mouseleave') unHover() {
    this.borderColor = 'initial';
  }

}
