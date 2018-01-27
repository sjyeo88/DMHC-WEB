import { Pipe, PipeTransform } from '@angular/core';
import { Req2 } from '../service/get-public-data.service'

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value = ''):string {
    return [ value.substr(0, 3), value.substr(3, 4), value.substr(7, 4)].join('-')
  }
}

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  transform(value):string {
    return (value === 0 || value === 1) ? (value==0) ? '남' : '여' : '';
    // console.log(value);
    // return value===0 ? '남' : '여';
  }
}
