import { Injectable } from '@angular/core'



@Injectable()
export class AllLectureModel {
    public allLectures={};

}

interface AllLecture {
  num:number;
  name:string;
  type:number;
  status:string;
  date:string;
}
