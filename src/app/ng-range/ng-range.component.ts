import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export type RangeOptions = {
  min: number
  max: number
  ticks: Array<number>
};

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgRangeComponent),
  multi: true,
};

@Component({
  selector: 'app-ng-range',
  templateUrl: './ng-range.component.html',
  styleUrls: ['./ng-range.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class NgRangeComponent implements AfterViewInit, ControlValueAccessor {
  private onTouched: void;
  private disabled: boolean;

  @Input()
  options: RangeOptions;
  @ViewChild('slideContainer')
  slideContainer: ElementRef;

  onChange: (val) => {};
  sliderLeftPosition = 0;
  value: string;
  constructor() {
  }

  getTickPercentPosition(tick: number): string {
    const percents = ((tick - this.options.min) * 100) / (this.options.max - this.options.min);
    return `${percents}%`;
  }

  sliderChangeHandler(left: number) {
    this.sliderLeftPosition = left;
    const percents = (left * 100) / this.slideContainer.nativeElement.offsetWidth;
    const result = Math.round((((this.options.max - this.options.min) / 100) * percents) + this.options.min);
    this.value = result.toString();
    this.onChange(this.value);
  }

  inputChangeHandler(val: string) {
    this.value = val;
    let percents = ((Number(this.value) - this.options.min) * 100) / (this.options.max - this.options.min);
    percents = this.getBorderValue(0, 100, percents);
    this.sliderLeftPosition = Math.round((this.slideContainer.nativeElement.offsetWidth / 100) * percents);
  }

  inputConfirmHandler(event) {
    event.preventDefault();
    this.value = this.getBorderValue(this.options.min, this.options.max, Number(this.value)).toString();
    this.onChange(this.value);
  }

  setFavoriteValue(event: MouseEvent, val: number) {
    event.preventDefault();
    this.value = val.toString();
    this.inputChangeHandler(this.value);
    this.onChange(val);
  }

  getBorderValue(min: number, max: number, val: number) {
    return val < min ? min : val > max ? max : val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.inputChangeHandler(this.value));
  }
}
