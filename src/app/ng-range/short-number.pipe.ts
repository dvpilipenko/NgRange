import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(value: number): any {
    const result = this.revers(value.toString()).replace('000', 'K');
    return this.revers(result.replace('KK', 'M'));
  }

  revers(str: string) {
    return str.split('')
      .reverse()
      .join('');
  }
}
