import { Injectable } from '@angular/core'
import { FormArray, AbstractControl, FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DropDownOpt } from '../assign.model'
import * as cloneDeep from 'lodash.cloneDeep';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

class ValidConfig {
  requireMsg = "입력 란을 작성하세요.";
  titleMax:number = 30;
  titleMaxLengthMsg:string = '길이가 너무 깁니다 [' + this.titleMax+ ' 자 이하]'
  titleDuplicateMsg:string = '기존 과제 중 중복된 설문이 있습니다.'
  subTitleMax:number = 30;
  subTitleMaxLengthMsg:string = '길이가 너무 깁니다 [' + this.subTitleMax+ ' 자 이하]'
  commandMax:number = 30;
  commandMaxLengthMsg:string = '길이가 너무 깁니다 [' + this.commandMax+ ' 자 이하]'
  tableMax:number = 10;
  tableMaxLengthMsg:string = '길이가 너무 깁니다 [' + this.tableMax+ ' 자 이하]'
  pushTimeValidMsg:string = '사이 시간을 구할 수 없습니다.'
}

@Injectable()
export class AssignForm {
  public valider = new ValidConfig()
  public assignForm:FormGroup
  public assignGroup:FormGroup
  public surveyGroup:FormGroup

  constructor(
    private fb: FormBuilder,
  ) {

    this.assignGroup = this.fb.group({
      subTitle: ['', [
        Validators.required,
        Validators.maxLength(this.valider.subTitleMax),
      ]],
      command: ['', [
        Validators.required,
        Validators.maxLength(this.valider.commandMax),
      ]],

      create: this.fb.group({
        type: [0, [
          Validators.required,
        ]],
        byDate: [{value:1, disabled:true}, [
          Validators.required,
        ]],
        byNum: [{value:1, disabled:true}, [
          Validators.required,
        ]],
        byNoAndAssign: this.fb.group({
          byNum: [{value:1, disabled:true}, [Validators.required]],
          byAssign: [{value:null, disabled:true}, [Validators.required]],
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
        byWeekDate: [{value:[0], disabled:true}, [
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
          Validators.required,
        ]],
        time: [{value:0, disabled: true}, [
          Validators.required,
        ]],
        survey: [{value:null, disabled: true}, [
          Validators.required,
        ]],

        table: this.fb.group({
          column: [{value:1, disabled: true}, [
            Validators.required,
          ]],
          row: [{value:1, disabled: true}, [
            Validators.required,
          ]],
          tableData: this.fb.array([
            this.fb.array([
              this.fb.group({data: [{value:'', disabled: true},[]]})
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
      expand: false,
    })


    this.surveyGroup = this.fb.group({
      title: ['', []],
      type: [0, []],
      time: ['', []],
    })

    this.assignForm = this.fb.group({
        title: ['', [
          Validators.required,
          Validators.maxLength(this.valider.titleMax),
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
    let assigns = (this.assignForm.get('assigns') as FormArray);
    assigns.insert(assigns.length, cloneDeep(this.assignGroup));
  }

  delAssign(item, idx) {
    let assigns = item.parent;
    assigns.removeAt(idx);
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
    form.get('num').enable();
    form.get('photo').enable();

    form.get('time').disable();
    form.get('table').disable();
    form.get('survey').disable();
    // console.log(form.get('time'));
    switch(event.value) {
      case 3:
        form.get('num').disable();
        form.get('photo').disable();
        form.get('time').enable();
        break;
      case 5:
        form.get('num').disable();
        form.get('photo').disable();
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
        row.map((obj, idx)=>{
          if(adjColVal < 0) {
            obj.removeAt(obj.length-1)
          } else if(adjColVal > 0) {
            if(idx === 0) {
              obj.insert(obj.length, this.fb.group({data:['',[
                Validators.required,
                Validators.maxLength(this.valider.tableMax),
              ]]}));
            } else {
              obj.insert(obj.length, this.fb.group({data:'',}));
            }
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
      if(i!==0) addCol.insert(addCol.length, this.fb.group({data:''}));
      else {
        addCol.insert(addCol.length, this.fb.group({data:[i!==0 && idx&& value ? value : '',[
          Validators.required,
          Validators.maxLength(this.valider.tableMax),
        ]]}));
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

  spinnerMinMax(min, max, formCtrl){
    if(isNaN(formCtrl.value) || formCtrl.value < min) {
      formCtrl.patchValue(min);
      return false;
    }
    if(formCtrl.value > max) {
      formCtrl.patchValue(min);
      return false;
    }
  }

  timeRangeValidator(form: AbstractControl) {
    const fromTime = form.get('fromTime').value;
    const toTime = form.get('toTime').value;
    // console.log(fromTime.getTime() - toTime.getTime());
    if((toTime && fromTime) && (fromTime.getTime() - toTime.getTime()) > 0) {
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
        addCol.insert(addCol.length, this.fb.group({data:[i===0 ? value : '',
        i===0 ? [ Validators.required, Validators.maxLength(this.valider.tableMax)] : [],
      ]}));
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

  getTableData(item) {
    console.log(item);
    let tgtInput =  item.get('input').get('table').get('tableData');
    let table = [];
    let tableRow = [];
    for(let i = 0; i < tgtInput.length; i++) {
      for(let j = 0; j < tgtInput.controls[0].controls.length; j++) {
        tableRow.push(tgtInput.controls[i].controls[j].get('data').value);
      }
      table[i] = tableRow;
      tableRow = [];
      // console.log(table);
    }
    return JSON.stringify(table);
  }

  setTableData(item, data) {
    let rowNum = data.length;
    let colNum = data[0].length;
    let tgtInput =  item.get('input').get('table')
    tgtInput.patchValue({ 'row': rowNum, 'column': colNum, })
    this.adjRow(null, item);
    this.adjCol(null, item);
    for(let i=0; i < rowNum; i++) {
      for(let j=0; j < colNum; j++) {
        tgtInput.get('tableData').controls[i].controls[j].get('data').setValue(data[i][j]);
        // console.log(data[i][j]);
      }
    }


    // let tgtInput =  item.get('input').get('table').get('tableData');
    // let table = [];
    // let tableRow = [];
    // for(let i = 0; i < tgtInput.length; i++) {
    //   for(let j = 0; j < tgtInput.controls.length; j++) {
    //     tableRow.push(tgtInput.controls[i].controls[j].get('data').value);
    //   }
    //   table[i] = tableRow;
    //   tableRow = [];
    //   // console.log(table);
    // }
    // return JSON.stringify(table);
  }

}
