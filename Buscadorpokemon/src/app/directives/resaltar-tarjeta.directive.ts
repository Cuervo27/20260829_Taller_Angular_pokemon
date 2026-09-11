import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appResaltarTarjeta]',
  standalone: true
})
export class ResaltarTarjetaDirective {
  private el = inject(ElementRef);

  colorBorde = input<string>('yellow');

  @HostListener('mouseenter') onMouseEnter() {
    this.aplicarEfecto(`3px solid ${this.colorBorde()}`, 'scale(1.03)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.aplicarEfecto('3px solid #0000ff', 'scale(1)');
  }

  private aplicarEfecto(borde: string, transformacion: string) {
    this.el.nativeElement.style.border = borde;
    this.el.nativeElement.style.transform = transformacion;
    this.el.nativeElement.style.transition = 'all 0.3s ease-in-out';
  }

  constructor() { }
}
