export interface Hash {
  idHASH:number;
  idEXPERT_USER:number;
  name:string;
  ADD_TIME:string;
  children:number;
}

export interface HashSub {
  idHASH_SUB:number;
  idHASH:number;
  text:string;
  ADD_TIME:string;
  children:number;
}

export interface HashTable {
  index: number;
  tableId:number;
  rawId:number;
  subId:number;
  inputId:number;
  name:string;
  number: number;
  ADD_TIME:string;
  expand:boolean;
  sub:boolean;
  depth:number;
  isSaved:boolean;
  isSaving:boolean;
  isSavable:boolean;
  isNesting:boolean;
  isDuplicate:boolean;
  parent:any;
}

export class Table {
  model:HashTable[] = [];
}
