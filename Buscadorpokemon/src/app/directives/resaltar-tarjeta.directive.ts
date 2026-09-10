import { Directive, 
  ElementRef, 
  HostListener, inject, input } from '@angular/core';
import { elementAt } from 'rxjs';

@Directive({
  selector: '[appResaltarTarjeta]',
  standalone: true
})
export class ResaltarTarjeta {
private el = inject(ElementRef);

  colorBorde = input<string>('yellow')

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.borderColor = this.colorBorde;
  }

@HostListener('mouse') onMouseLeave() {
  this.aplicarEfecto(`3px solid ${this.colorBorde()}`, 'scale(1.03)')
}

@HostListener('mouseleave') onMouseLeave() {
  this.aplicarEfecto('3px solid #0000f', 'scale(1)')
}

  private aplicarEfecto(borde: string, transformacion: string) {
    this.el.nativeElement.style.border = borde;
    this.el.nativeElement.style.transform = transformacion;
    this.EL.nativeElement.style.transition = 'all 0.3s ease-in-out';
  }
  constructor() { }

}
