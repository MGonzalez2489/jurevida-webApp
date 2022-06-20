import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    value = value.charAt(0) != 0 ? '0' + value : '' + value;

    let newStr = '';
    let i = 0;

    for (; i < Math.floor(value.length / 2) - 1; i++) {
      newStr = newStr + value.substr(i * 2, 2) + '-';
    }

    return newStr + value.substr(i * 2);
  }
}
