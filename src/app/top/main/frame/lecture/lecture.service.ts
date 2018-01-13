import { Injectable } from '@angular/core';
import { Req2 } from './../../../../service/get-public-data.service'
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { LectureTable, NewLectureData, Lecture} from  './new-lecture-data';

@Injectable()
export class LectureService {
  public msgs: Message[] = [];
  public allLectures: Lecture[] = [];
  public allLectureTable: LectureTable[] = [];

  getLectureByPage(page, callback?):void {
    let http = page ?
      new Req2('get', '/data/lectures/' + page) :
      new Req2('get', '/data/lectures')
    http.send();
    http.Complete = ()=> {
      if(callback) {
        callback();
      } else {
        return JSON.parse(http.response);
      }
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

  getLecture(callback?):any {
    let http = new Req2('get', '/data/lectures')
    http.send();
    http.Complete = ()=> {
      if(callback) {
        this.allLectures = JSON.parse(http.response);
        callback(JSON.parse(http.response));
      } else {
        this.allLectures = JSON.parse(http.response);
        return JSON.parse(http.response);
      }
    }
    http.ServErr = () =>{ this.msgs.push(http.smsgs) }
    http.ConErr = () =>{ this.msgs.push(http.cmsgs) }
  }

  lectureTable(lectureData:Lecture[]) {
    let idx = 0;
    lectureData.map((obj)=>{
      idx++;
      this.allLectureTable.push({
        index: idx,
        title: obj.title,
        type:  (obj.type==0) ? 'HTML' : 'PDF',
        page_no: obj.page_no,
        status: (obj.status==0) ? '완료' : '작성중',
        UPDATE_TIME: obj.UPDATE_TIME,
      });
    });
  }
}
