export interface DropDownOpt {
    value:number;
    label:string;
}

export interface ExpertUsers {
    idEXPERT_USER:number;
    name:string;
    email:string;
}

export interface Admin {
    name:string;
    email:string;
    phone:number;
}

export interface User {
  idEXPERT_USER:number;
  name:string;
  email:string;
  deptName:string;
  idDEPT:number;
  jobName:string;
  idJOBS:number;
  birth:string;
  phone:number;
  loginDate:Date;
}
