import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, field: any, reverse: any): any {
    if (!value) {
      return value;
    }
    var isArray = value instanceof Array;
    if (isArray) {
      return this.sortArray(value, field, reverse);
    }
    return value;
  }

  sortArray = function (value, expression, reverse) {
    var array = value.sort(function (a, b) {
      if (!expression) {
        return a > b ? 1 : -1;
      }
      return a[expression] > b[expression] ? 1 : -1;
    });
    if (reverse) {
      return array.reverse();
    }
    return array;
  };

}
