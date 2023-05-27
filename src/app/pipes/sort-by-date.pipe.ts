import { Pipe, PipeTransform } from '@angular/core';
import { SortAttribute, SortDirection } from './sort-by-date.model';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform<T extends unknown>(
    array: T[],
    attributNames: SortAttribute<T> | SortAttribute<T>[],
    direction: SortDirection = 'asc'
  ): T[] {
    return array.sort((a, b) => {
      const fields = Array.isArray(attributNames) ? attributNames : [attributNames];

      const directionFactor = direction === 'asc' ? 1 : -1;

      for (let field of fields) {
        if (typeof field === 'function') {
          const comparison = field(a, b, direction);
          if (comparison !== 0) return comparison;
          continue;
        }

        const valueA = a[field];
        const valueB = b[field];

        if (valueA instanceof Date && valueB instanceof Date) {
          if (valueA.getTime() > valueB.getTime()) return -directionFactor;
          if (valueA.getTime() < valueB.getTime()) return directionFactor;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          const compare = valueA.localeCompare(valueB);
          if (compare !== 0) return compare * directionFactor;
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          if (valueA > valueB) return -directionFactor;
          if (valueA < valueB) return directionFactor;
        } else {
          throw new Error('SortByDate-Pipe can only sort by Date, Number or String. Others types need to be added, if needed!');
        }
      }
      return 0;
    });
  }

}
