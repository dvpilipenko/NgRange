import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputFormat'
})
export class InputFormatPipe implements PipeTransform {

  transform(value: string): unknown {
    return Number(value).toLocaleString();
  }
}
