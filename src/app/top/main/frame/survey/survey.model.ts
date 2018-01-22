
interface SurveyConfig {
  idSURVEY: number;
  idEXPERT_USER: number;
  title:string;
  degree:number;
  text01:string;
  text02:string;
  text03?:string;
  text04?:string;
  text05?:string;
  text06?:string;
  text07?:string;
  UPDATE_TIME:string;
  ADD_TIME:string;
}

interface  SurveyOjbect {
  idSURVEY: number;
  surv_num: number;
  text: string;
  subtype: number;
}

interface SurveyMeasure {
  label:string;
  value:number;
}

export interface Title {
  label:string;
  value:number;
}

export class SurveyModel {
  public measures:SurveyMeasure[] = [
    {label:'2점척도', value:2},
    {label:'3점척도', value:3},
    {label:'4점척도', value:4},
    {label:'5점척도', value:5},
    {label:'6점척도', value:6},
    {label:'7점척도', value:7},
  ];
}
