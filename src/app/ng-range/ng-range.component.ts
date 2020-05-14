import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonFunc} from './common-func';

export type RangeOptions = {
  min: number
  max: number
  ticks: Array<number>
};

type Tick = {
  percent: string,
  value: number
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
export class NgRangeComponent implements OnInit, ControlValueAccessor {
  private onTouched: void;
  private disabled: boolean;

  @Input()
  options: RangeOptions;
  @ViewChild('slideContainer')
  slideContainer: ElementRef;

  onChange: (val) => {};
  ticks: Array<Tick>;
  sliderLeftPosition = 0;
  value: string;

  constructor() {
  }

  ngOnInit(): void {
    this.ticks = this.options.ticks.map(value => {
      return {
        percent: this.getTickPercentPosition(value),
        value
      };
    });
  }

  getTickPercentPosition(tick: number): string {
    const percents = ((tick - this.options.min) * 100) / (this.options.max - this.options.min);
    return `${percents}%`;
  }

  sliderChangeHandler(left: number) {
    this.sliderLeftPosition = left;
    const result = Math.round((((this.options.max - this.options.min) / 100) * left) + this.options.min);
    this.value = result.toString();
    this.onChange(this.value);
  }

  inputChangeHandler(val: string) {
    this.value = val;
    let percents = ((Number(this.value) - this.options.min) * 100) / (this.options.max - this.options.min);
    percents = CommonFunc.getBorderValue(0, 100, percents);
    this.sliderLeftPosition = percents;
  }

  inputConfirmHandler(event) {
    event.preventDefault();
    this.value = CommonFunc.getBorderValue(this.options.min, this.options.max, Number(this.value)).toString();
    this.onChange(this.value);
  }

  setFavoriteValue(event: MouseEvent, val: number) {
    event.preventDefault();
    this.value = val.toString();
    this.inputChangeHandler(this.value);
    this.onChange(val);
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
    this.inputChangeHandler(this.value);
  }
}
