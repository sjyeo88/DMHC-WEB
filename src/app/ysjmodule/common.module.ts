
export class YCommonModule {
  constructor() {}
  public getValueInArray(arr:any[], key:string, value:any, callback?) {
    arr.map((obj)=>{
      if(obj[key] === value)  {
        return obj;
      
      }
    })
  }
}
