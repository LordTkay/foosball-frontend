import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform<T extends unknown>(array: T[], attributName: keyof T): T[] {
    return array.sort((a, b) => {
      const valueA = a[attributName];
      const valueB = b[attributName];

      if (valueA instanceof Date && valueB instanceof Date) {
        return valueA.getTime() > valueB.getTime() ? -1 : 0;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      throw new Error('SortByDate-Pipe can only sort by Date or String. Others types need to be added, if needed!');
    });
  }

}
