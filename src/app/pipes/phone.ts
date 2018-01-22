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
