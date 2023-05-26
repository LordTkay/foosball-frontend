import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform<T extends unknown>(array: T[], attributName: keyof T): any[] {
    return array.sort((a, b) => {
      const valueA = a[attributName];
      const valueB = b[attributName];

      if (!(valueA instanceof Date) || !(valueB instanceof Date)) {
        throw new Error('SortByDate-Pipe can only be used with Date Attributes. Others types need to be added, if needed!');
      }

      return valueA.getTime() > valueB.getTime() ? -1 : 0
    })
  }

}
