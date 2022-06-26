import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    const d = new Date(value);
    return d.toLocaleDateString('dd-MM-yyyy').toString();
  }
}
