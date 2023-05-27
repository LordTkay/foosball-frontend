import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform<T extends unknown>(array: T[], attributNames: keyof T | (keyof T)[]): T[] {
    return array.sort((a, b) => {
      const fields = Array.isArray(attributNames) ? attributNames : [attributNames];

      for (let field of fields) {
        const valueA = a[field];
        const valueB = b[field];

        if (valueA instanceof Date && valueB instanceof Date) {
          if (valueA.getTime() > valueB.getTime()) return -1;
          if (valueA.getTime() < valueB.getTime()) return 1;

        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          const compare = valueA.localeCompare(valueB);
          if (compare !== 0) return compare;

        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
        }
      }

      throw new Error('SortByDate-Pipe can only sort by Date or String. Others types need to be added, if needed!');
    });
  }

}
