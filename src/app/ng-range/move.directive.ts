import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';
import {CommonFunc} from './common-func';
import * as _ from 'lodash';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective implements OnInit {
  parentElement: HTMLElement;
  @Output() outputOnChange = new EventEmitter();
  throttledOnChange = _.throttle(() => this.outputOnChange.emit(this.left), 100);
  globalListenMouseMove: any;
  globalListenMouseUp: any;
  parentWidth: number;
  @Input()
  left;
  x: number;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.parentElement = this.elRef.nativeElement.parentElement;
  }

  @HostBinding('style.left') get getLeftPosition() {
    return `${this.left}%`;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.parentWidth = this.parentElement.getBoundingClientRect().width;
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
    const newPos = (this.left * this.parentWidth / 100) + (event.x - this.x);
    const percent = (newPos * 100) / this.parentWidth;
    this.left = CommonFunc.getBorderValue(0, 100, percent);
    this.throttledOnChange();
    this.x = this.left <= 0 || this.left >= 100 ? this.x : event.x;
  }
}
