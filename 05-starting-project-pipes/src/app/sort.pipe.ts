import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: string[] | number[] , direction : 'asc' | 'dsc' = 'asc' ) {
    const sorted = [...value];
    sorted.sort((a , b) => {
      if(direction === 'asc'){
        return a > b ? 1 : -1;
      } else {
        return b > a ? -1 : 1;
      }
    });
    return sorted;
  }

}
