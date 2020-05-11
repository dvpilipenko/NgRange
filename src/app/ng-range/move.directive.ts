import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective implements OnInit {
  parentElement: HTMLElement;
  @Output() outputOnChange = new EventEmitter();
  globalListenMouseMove: any;
  globalListenMouseUp: any;
  @Input()
  left;
  x: number;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.parentElement = this.elRef.nativeElement.parentElement;
  }

  @HostBinding('style.left') get getLeftPosition() {
    return `${this.left}px`;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.x = event.x;
    this.globalListenMouseMove = this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
    this.globalListenMouseUp = this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this));
  }

  onMouseUp() {
    this.outputOnChange.emit(this.left);
    this.globalListenMouseMove();
    this.globalListenMouseUp();
  }

  onMouseMove(event: MouseEvent) {
    const newPos = this.left + (event.x - this.x);
    this.left = newPos >= 0 && this.parentElement.offsetWidth >= newPos ? newPos : this.left;
    this.x = event.x;
  }
}
