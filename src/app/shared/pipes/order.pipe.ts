import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], field: string, direction = false): any {
    if (field) {
      const compareFn = (a, b) => {
        const aValue = get(a, field);
        const bValue = get(b, field);
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return direction ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
      };
      return value.sort(compareFn);
    }
    return value;
  }

}
