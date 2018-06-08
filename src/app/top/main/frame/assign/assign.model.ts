export interface AssignConfAll {
    idSBJTS: number;
    idSB_SBJT_CONF: number;
    idLECTURE:number;
    idEXPERT_USER:number;
    title:string
    status:number;
    assigns:AssignConf[]
}
export interface AssignConf {
  idSB_SBJT_CONF?: number;
  idSBJT_CONF?: number;
  title:string;
  command:string;
  index: number;
  type_create_condition:number;
  conf_create_condition_01:number;
  conf_create_condition_02:number;
  conf_create_condition_03:number;
  conf_create_condition_04:number;
  type_create_num:number;
  conf_create_num_01:number;
  conf_create_num_02:string;
  conf_create_num_03:number;
  conf_push_time_01:string;
  conf_push_time_02:string;
  type_repush_time:number;
  conf_repush_time_01:string;
  type_input:number;
  conf_input_01:number;
  conf_input_02:number;
  conf_input_03:number;
  conf_input_04:string;
  conf_input_05:number;
  type_stop:number;
  conf_stop_01:number;
  conf_stop_02:number;
  type_del:number;
  conf_del_01:number;
  conf_del_02:number;
}


export interface DropDownOpt {
  label: string,
  value: number,
}

export interface AssignBoard {
  no:number;
  title:string;
  lecture:string;
  status:string;
  date:string;
  assignText:string[];
}


export class Options {
  public weekDayOpt = [
    {label: '월요일', value:0},
    {label: '화요일', value:1},
    {label: '수요일', value:2},
    {label: '목요일', value:3},
    {label: '금요일', value:4},
    {label: '토요일', value:5},
    {label: '일요일', value:6},
  ]
  public timeScheOpt:DropDownOpt[] = [
    {label: '30분', value:0},
    {label: '2시간', value:2},
    {label: '1시간', value:1},
  ]
  public createTimeCond:DropDownOpt[]= [
    {label: '내담자 로그인 시 바로 해당 과제 생성 시작', value:0},
    {label: '지정된 날짜 이후로 해당 과제 생성 시작', value:1},
    {label: '내담자가 전체 과제를 지정된 횟수 이상 수행한 이후 해당 과제 생성 시작', value:2},
    {label: '내담자가 지정된 과제를 지정된 횟수 이상 수행한 이후 해당 과제 생성 시작', value:3},
  ]
  public createNumCond:DropDownOpt[]= [
    {label: '매일 지정된 개수 생성', value:0},
    {label: '지정된 날짜 마다 지정된 개수 생성', value:2},
    {label: '지정된 요일 마다 지정된 개수 생성', value:1},
  ]
  public inputType:DropDownOpt[]= [
    {label: '단순 텍스트 입력', value:0},
    {label: '일일 활동 기록지', value:3},
    {label: '주간 목표 계획지', value:2},
    {label: '주간 활동 기록지', value:4},
    {label: '설문 작성하기', value:7},
    {label: '사용자 정의 테이블 형식', value:5},
    {label: '교육 다시보기', value:6},
  ]

  public surveySchOpt:DropDownOpt[]= [
    {label: '월 1회', value:0},
    {label: '주 1회', value:1},
    {label: '일 1회', value:2},
  ]

  public tableInputOpt:DropDownOpt[]= [
    {label: '단순 텍스트 입력', value:0},
    {label: '숫자 입력', value:1},
    {label: '감정 선택 입력', value:2},
    {label: '활동 선택 입력', value:3},
    {label: '이모티콘 입력', value:4},
    {label: 'O/X 입력', value:5},
  ]

  public delOpt:DropDownOpt[]= [
    {label: '과제 소멸없이 지속', value:0},
    {label: '완료하지 않은 과제 수가 지정한 갯수 일 때, 가장 오래된 과제부터 소멸', value:1},
    {label: '완료하지 않은 과제가 지정한 일수 이상 지났을 때 해당 과제 소멸', value:2},
  ]

  public stopOpt:DropDownOpt[]= [
    {label: '과제제시 중지없이 지속', value:0},
    {label: '첫 과제가 제시된 지 지정한 일수 이상 경과할 시 중지', value:1},
    {label: '내담자의 수행 과제 수가 지정한 개수 이상일 때 중지', value:2},
  ]
}
