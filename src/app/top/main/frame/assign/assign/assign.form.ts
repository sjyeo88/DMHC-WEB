import { Injectable } from '@angular/core'
import { FormArray, AbstractControl, FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import  cloneDeep = require('lodash.cloneDeep');

@Injectable()
export class AssignForm {
  public assignForm:FormGroup
  public assignGroup:FormGroup
  public surveyGroup:FormGroup
  public weekDayOpt = [
    {label: '월요일', value:'mon'},
    {label: '화요일', value:'tue'},
    {label: '수요일', value:'wed'},
    {label: '목요일', value:'thu'},
    {label: '금요일', value:'fri'},
    {label: '토요일', value:'sat'},
    {label: '일요일', value:'sun'},
  ]
  public timeScheOpt = [
    {label: '30분', value:0},
    {label: '2시간', value:2},
    {label: '1시간', value:1},
  ]
  public createTimeCond= [
    {label: '내담자 로그인 시 바로 해당 과제 생성 시작', value:0},
    {label: '지정된 날짜 이후로 해당 과제 생성 시작', value:1},
    {label: '내담자가 전체 과제를 지정된 횟수 이상 수행한 이후 해당 과제 생성 시작', value:2},
    {label: '내담자가 지정된 과제를 지정된 횟수 이상 수행한 이후 해당 과제 생성 시작', value:3},
  ]
  public createNumCond= [
    {label: '매일 지정된 개수 생성', value:0},
    {label: '지정된 날짜 마다 지정된 개수 생성', value:2},
    {label: '지정된 요일 마다 지정된 개수 생성', value:1},
  ]
  public inputType= [
    {label: '단순 텍스트 입력', value:0},
    {label: '단순 음성 입력', value:1},
    {label: '텍스트 / 음성 사용자 선택', value:2},
    {label: '일일 기준 시간 별 입력', value:3},
    {label: '주간 계획 입력', value:4},
    {label: '설문 작성하기', value:7},
    {label: '사용자 정의 테이블 형식', value:5},
    {label: '교육 다시보기', value:6},
  ]

  public surveySchOpt= [
    {label: '월 1회', value:0},
    {label: '주 1회', value:1},
    {label: '일 1회', value:2},
  ]

  constructor(
    private fb: FormBuilder,
  ) {

    this.assignGroup = this.fb.group({
      subTitle: ['', [
        Validators.required,
      ]],
      command: ['', [
        Validators.required,
      ]],

      create: this.fb.group({
        type: [0, [
          Validators.required,
        ]],
        byDate: [{value:1, disabled:true}, [
          // Validators.required,
        ]],
        byNum: [{value:1, disabled:true}, [
          // Validators.required,
        ]],
        byNoAndAssign: this.fb.group({
          byNum: [{value:1, disabled:true}, []],
          byAssign: [{value:1, disabled:true}, []],
        }),
      }),

      prod: this.fb.group({
        type: [0, [
          Validators.required,
        ]],
        byNum: [1, [
          Validators.required,
        ]],
        byDate: [{value:1, disabled:true}, [
          Validators.required,
        ]],
        byWeekDate: [{value:[], disabled:true}, [
          Validators.required,
        ]],
      }),

      input: this.fb.group({
        type: [0, [ //1 ~ 7
          Validators.required,
        ]],
        photo: [false, [
          // Validators.required,
        ]],
        num: [1, [
          // Validators.required,
        ]],
        time: [{value:[], disabled: true}, [
          Validators.required,
        ]],
        survey: [{value:0, disabled: true}, [
          Validators.required,
        ]],

        table: this.fb.group({
          // column: [{value:0, disabled:true}, [
          column: [{value:1, disabled: true}, [
            // Validators.required,
          ]],
          // row: [{value:0, disabled:true}, [
          row: [{value:1, disabled: true}, [
            // Validators.required,
          ]],
          tableData: this.fb.array([
            this.fb.array([
              this.fb.group({data: [{value:'', disabled: true},[Validators.required]]})
            ]),
          ]),
        }),
      }),

      push: this.fb.group({
        times: this.fb.group({
          fromTime: [new Date(0, 0, 0, 0, 0, 0, 0), [
          Validators.required,
          ]],
          toTime: [new Date(0, 0, 0, 0, 0, 0, 0), [
            Validators.required,
          ]],
        }, { validator: this.timeRangeValidator}),

        push_type: [0, []],
        time: [{value:1, disabled: true}, []],
      }),

      del: this.fb.group({
        del_type: [0, []],
        byNum: [{value:1, disabled: true}, []],
        byDate: [{value:1, disabled: true}, []],
      }),

      stop: this.fb.group({
        stop_type: [0, []],
        byDate: [{value:1, disabled: true}, []],
        byNum: [{value:1, disabled: true}, []],
      }),
      expand: true,
    })


    this.surveyGroup = this.fb.group({
      title: ['', []],
      type: [0, []],
      time: ['', []],
    })

    this.assignForm = this.fb.group({
        title: ['', [
          Validators.required,
          // Validators.maxLength(this.valider.titleMax),
        ]],
        lecture: ['', [
          Validators.required,
        ]],
        assigns: this.fb.array([
          cloneDeep(this.assignGroup)
        ]),
    })
  }


  addAssign() {
    let assigns = (this.assignForm.controls.assigns as FormArray)
    assigns.insert(assigns.length, cloneDeep(this.assignGroup))
  }

  createFormControl(event, item) {
    // console.log(event)
    // console.log(item);
    let form = item.get('create')
    // document.getElementById('createByNum').disable()
    form.get('byDate').disable();
    form.get('byNum').disable();
    form.get('byNoAndAssign').disable();
    switch(event.value) {
      case 1:
        form.get('byDate').enable();
        break;
      case 2:
        form.get('byNum').enable();
        break;
      case 3:
        form.get('byNoAndAssign').enable();
        break;
    }
  }

  prodFormControl(event, item) {
    // console.log(event)
    // console.log(item);
    let form = item.get('prod')
    // document.getElementById('createByNum').disable()
    form.get('byDate').disable();
    form.get('byWeekDate').disable();
    switch(event.value) {
      case 2:
        form.get('byDate').enable();
        break;
      case 1:
        form.get('byWeekDate').enable();
        break;
    }
  }

  inputFormControl(event, item) {
    // console.log(event)
    // console.log(item);
    let form = item.get('input')
    // document.getElementById('createByNum').disable()
    form.get('time').disable();
    form.get('table').disable();
    form.get('survey').disable();
    // console.log(form.get('time'));
    switch(event.value) {
      case 3:
        form.get('time').enable();
        break;
      case 5:
        form.get('table').enable();
        break;
      case 6:
        form.get('num').disable();
        form.get('photo').disable();
        break;
      case 7:
        form.get('num').disable();
        form.get('photo').disable();
        form.get('survey').enable();
    }
  }

  pushFormControl(item) {
    // console.log(event)
    setTimeout(()=>{
      let form = item.get('push');
      let radio = form.get('push_type');
      // document.getElementById('createByNum').disable()
      form.get('time').disable();
      switch(radio.value) {
        case 1:
          form.get('time').enable();
          break;
      }
    }, 100)
  }

  delFormControl(item) {
    // console.log(event)
    setTimeout(()=>{
      let form = item.get('del');
      let radio = form.get('del_type');
      // document.getElementById('createByNum').disable()
      form.get('byDate').disable();
      form.get('byNum').disable();
      switch(radio.value) {
        case 1:
          form.get('byNum').enable();
          break;
        case 2:
          form.get('byDate').enable();
          break;
      }
    }, 100)
  }
  stopFormControl(item) {
    // console.log(event)
    setTimeout(()=>{
      let form = item.get('stop');
      let radio = form.get('stop_type');
      // document.getElementById('createByNum').disable()
      form.get('byDate').disable();
      form.get('byNum').disable();
      switch(radio.value) {
        case 1:
          form.get('byDate').enable();
          break;
        case 2:
          form.get('byNum').enable();
          break;
      }
    }, 100)
  }


  adjCol(event, item){
    let table = item.controls.input.controls.table;
    let tableData = table.controls.tableData;
    let setCol= table.controls.column.value;
    let row=tableData.controls;
    let col=row[0].controls;
    let colLen=col.length;
    let adjColVal= setCol-colLen;
    if(isNaN(setCol) || setCol < 1) {
      table.patchValue({column: 1});
      return false;
    }
    if(setCol < 4) {
      for(let i=0; i < Math.abs(adjColVal); i++) {
        row.map((obj)=>{
          if(adjColVal < 0) {
            obj.removeAt(obj.length-1)
            // controls.splice(obj.length, 1)
          } else if(adjColVal > 0) {
            obj.insert(obj.length, this.fb.group({data:['',[Validators.required]]}));
          }
        })
      }
    } else {
      table.patchValue({column: 3});
    }
  }

  adjRow(event, item, idx?, value?){
    let table = item.controls.input.controls.table;
    let tableData = table.controls.tableData;
    let setRow= table.controls.row.value;
    let row=tableData.controls;
    let col=row[0].controls;
    let rowLen=row.length;
    let colLen=col.length;
    let adjRowVal= setRow-rowLen;
    let addCol = this.fb.array([]);

    if(isNaN(setRow) || setRow < 1) {
      table.patchValue({row: 1});
      return false;
    }
    if(setRow < 121) {
    for(let i=0; i < colLen; i++) {
      if(idx && value) {
        addCol.insert(addCol.length, this.fb.group({data:[i!==0 ? value : '',[Validators.required]]}));
      } else {
        addCol.insert(addCol.length, this.fb.group({data:['',[Validators.required]]}));
      }
    }
    for(let i=0; i < Math.abs(adjRowVal); i++) {
      if(adjRowVal < 0 ){
        tableData.removeAt(tableData.controls.length-1);
      } else if(adjRowVal >0 ) {
        tableData.insert(tableData.controls.length, cloneDeep(addCol))
      }
    }
    } else {
      table.patchValue({row: 120});
    }
  }

  spinnerMinMax(min, max, item, parent, formCtrl){
    let form = item.get(parent);
    let tgtForm = form.get(formCtrl);
    // console.log('Works');
    if(isNaN(tgtForm.value) || tgtForm.value < min) {
      // console.log(tgtForm.value);
      form.controls[formCtrl].patchValue(min);
      return false;
    }
    if(tgtForm.value > max) {
      form.controls[formCtrl].patchValue(max);
      return false;
    }
  }

  timeRangeValidator(form: AbstractControl) {
    const fromTime = form.get('fromTime').value;
    const toTime = form.get('toTime').value;
    // console.log(fromTime.getTime() - toTime.getTime());
    if((fromTime.getTime() - toTime.getTime()) > 0) {
      return {match: {fromTime, toTime}};
    } else {
      return null;
    }
  }

  tablePaste(event, item, row) {
    let clipboardData = event.clipboardData.getData('Text');
    // let objectText = this.surveyForm.controls.objectArray as FormArray;
    // console.log(event);
    let tgtInput =  item.get('input').get('table').get('tableData');
    let wordList = clipboardData.split('\r\n')
    if(wordList[wordList.length-1] === "") {
      wordList.splice(wordList.length-1, 1);
    }

    let cuVal = item.get('input').get('table').get('row').value
    item.get('input').get('table').patchValue({row: cuVal+wordList.length-1})
    setTimeout(()=>{
      wordList.reverse().map((obj)=>{
        this.pasteRow(event, tgtInput, row, obj);
      })
      tgtInput.removeAt(row);
      // this.removeObjectText(idx);
    }, 50)
  }

  pasteRow(event, tableData, idx, value){
    let col=tableData.controls[0];
    let colLen=col.length;
    let addCol = this.fb.array([]);
    for(let i=0; i < colLen; i++) {
        addCol.insert(addCol.length, this.fb.group({data:[i===0 ? value : '',[Validators.required]]}));
    }
    tableData.insert(idx+1, cloneDeep(addCol))
  }

  openRow(idx, tableData) {
    let cuVal = tableData.parent.get('row').value
    tableData.parent.patchValue({row: cuVal+1})
    return new Promise((resolve)=>{
      this.pasteRow(null, tableData, idx, '')// this.insertObjectText(idx);
      resolve(true)
    })
  }
}
