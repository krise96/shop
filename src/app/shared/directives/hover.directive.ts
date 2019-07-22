import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @Input('appHover') borderColor;

  ngAfterViewInit(): void {
    this.borderColor = this.borderColor ? this.borderColor : 'yellow';
  }

  @HostListener('mouseenter') hover() {
    this.changeBorderColor(this.borderColor);
  }

  @HostListener('mouseleave') unHover() {
    this.changeBorderColor('initial');
  }

  private changeBorderColor(color: string): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'borderColor', color);
  }

}
