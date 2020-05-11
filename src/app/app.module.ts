import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyFormComponent } from './my-form/my-form.component';
import { NgRangeComponent } from './ng-range/ng-range.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MoveDirective } from './ng-range/move.directive';
import { NumberOnlyDirective } from './ng-range/number-only.directive';
import { ShortNumberPipe } from './ng-range/short-number.pipe';
import { InputFormatPipe } from './ng-range/input-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    NgRangeComponent,
    MoveDirective,
    NumberOnlyDirective,
    ShortNumberPipe,
    InputFormatPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
