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
    {label: '시간 별 입력', value:3},
    {label: '주간 계획 입력', value:4},
    {label: '지정된 테이블 형식', value:5},
    {label: '교육 다시보기', value:6},
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
        time: [[], [
          Validators.required,
        ]],
        column: [0, [
          // Validators.required,
        ]],
        row: [0, [
          // Validators.required,
        ]],
        table: this.fb.group({}),
      }),

      push: this.fb.group({
        fromTime: ['', [
          Validators.required,
        ]],
        toTime: ['', [
          Validators.required,
        ]],
        push_type: [0, []],
        time: [1, []],
      }),

      del: this.fb.group({
        del_type: [0, []],
        byNum: [0, []],
        byDate: [0, []],
      }),

      stop: this.fb.group({
        stop_type: ["0", []],
        byDate: ['1', []],
        byNum: ['1', []],
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
          cloneDeep(this.assignGroup),
          cloneDeep(this.assignGroup),
        ])
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

      // prod: this.fb.group({
      //   type: [0, [
      //     Validators.required,
      //   ]],
      //   byNum: [1, [
      //     Validators.required,
      //   ]],
      //   byWeekDate: [[], [
      //     Validators.required,
      //   ]],
      // }),
}
