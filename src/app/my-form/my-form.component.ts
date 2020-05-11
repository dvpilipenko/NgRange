import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { RangeOptions } from '../ng-range/ng-range.component';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {

  constructor() {
  }

  form: FormGroup;
  options: RangeOptions;
  options2: RangeOptions;

  ngOnInit(): void {
    this.options = {min: 500, max: 1000, ticks: [600, 700, 999]};
    this.options2 = {min: 1000, max: 10000, ticks: [6000, 7000, 9000]};
    this.form = new FormGroup({
      value: new FormControl(655),
      value2: new FormControl(5000)
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
