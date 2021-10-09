import { Injectable } from '@angular/core';
import { CalculationService } from './calculation.service';
import { HttpService } from './http.service';
import { creditParamsType, creditTimeType, resultCreditType, tablePaymentType } from './type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private calculationService: CalculationService, private httpService: HttpService){}
  //параметры кредита
  private creditParams: creditParamsType = {
    sum: 10000,
    time: 12,
    rate: 0,
    type: 0 //Аннуитентный тип кредита
  }
  //массив возможных дат кредита
  private creditTime: creditTimeType[] = [
    { val: 1, text: '1 месяц' },
    { val: 3, text: '3 месяца' },
    { val: 6, text: '6 месяцев' },
    { val: 12, text: '1 год' },
    { val: 24, text: '2 года' },
    { val: 60, text: '5 лет' },
  ]
  //результаты рассчета кредита
  private resultCredit: resultCreditType = {
        creditSum: 0, //сумма кредита
    monthPay: 0, //платеж в месяц
    maxPay: 0, //макс платеж
    minPay: 0, //мин платеж
    totalSum: 0, //общая сумма платежа
    overpayment: 0, //сумма переплаты
    type: 0 //тип кредита 0 - аннуитентный, 1 - дифференциальный
  }
  //массива месячных платежей по кредиту
  private table: tablePaymentType[] = []; 

  getCreditParams(){
    return this.creditParams;
  }

  getCreditTime(){
    return  this.creditTime;
  }

  getResultCredit(){
    return this.resultCredit;
  }

  getTable(){
    return this.table;
  }

  changeCreditTime(e: any) {
    this.creditParams.time = e.value;
  }

  changeType(typeCredit: number){
    this.creditParams.type = typeCredit;
  }

  errorInput(){
    if(this.creditParams.rate === null){
      this.creditParams.rate = 0;
    }
    if(this.creditParams.sum === null){
      this.creditParams.sum = 0;
    }
  }
  //подсчет кредита и таблицы выплат
  calc(){
    Object.assign(this.resultCredit, this.calculationService.calcCredit(this.creditParams));
    Object.assign(this.table, this.calculationService.calcTable(this.creditParams, this.resultCredit))
  }

}


