import { Injectable } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { creditParamsType, resultCreditType, tablePaymentType } from './type';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  calcCredit(credit: creditParamsType): resultCreditType {
    if (credit.type === 0) { //выбор типа кредита
      return this.annuityPay(credit);
    } else {
      return this.differentPay(credit);
    }
  }
  //рассчет аннуитентного кредита
  annuityPay(credit: creditParamsType): resultCreditType {
    let res: resultCreditType = {
      creditSum: 0,
      monthPay: 0,
      maxPay: 0,
      minPay: 0,
      totalSum: 0,
      overpayment: 0,
      type: 0
    }
    let monthRate = credit.rate / 12 / 100;//месячная процентная ставка по кредиту
    //для рассчета аннуитивного кредита используется формула СК*(ПС*(1+ПС)^(М))/((1+ПС)^M-1) где СК - сумма кредита
                                                                                              // ПС - процент по выплатам в месяц
                                                                                              // М - количество месяцев на котрое взят кредит
    let monthPay = credit.sum *
      (monthRate * Math.pow(1 + monthRate, credit.time)) /
      (Math.pow(1 + monthRate, credit.time) - 1);
    monthPay = this.round(monthPay);
    res.creditSum = this.round(credit.sum);
    res.monthPay = this.round(monthPay);
    res.maxPay = 0;
    res.minPay = 0;
    res.totalSum = this.round(monthPay * credit.time);
    res.overpayment = this.round((monthPay * credit.time) - credit.sum);
    res.type = credit.type;
    return res;
  }
  //рассчет дифференцированного кредита
  differentPay(credit: creditParamsType): resultCreditType {
    let res: resultCreditType = {
      creditSum: 0,
      monthPay: 0,
      maxPay: 0,
      minPay: 0,
      totalSum: 0,
      overpayment: 0,
      type: 0
    }
    let debtPart = credit.sum / credit.time;
    console.log(debtPart);
    let monthRate = credit.rate / 12 / 100;

    res.creditSum = this.round(credit.sum);
    res.monthPay = 0;
    res.maxPay = this.round(debtPart + (credit.sum * monthRate)); //макс платеж = месячная выплата + (сумма кредита * месячный процент)
    res.minPay = this.round(debtPart + ((credit.sum - (debtPart * (credit.time - 1))) * monthRate)); //мин платеж = месячная выплата + (последний взнос по кредиту * месячный процент)
    res.totalSum = this.round((res.maxPay + res.minPay) / 2 * credit.time);
    res.overpayment = this.round(res.totalSum - credit.sum); 
    res.type = credit.type
    return res;
  }
  //заполнение табоицы выплат по месяцам
  calcTable(credit: creditParamsType, res: resultCreditType): tablePaymentType[] {
    if (credit.type == 0) {
      return this.calcTableAnnuity(credit, res);
    } else {
      return this.calcTableDifferent(credit, res);
    }
  }
  //рассчет таблицы для аннуитентного кредита
  calcTableAnnuity(credit: creditParamsType, res: resultCreditType): tablePaymentType[] {
    let table: tablePaymentType[] = [];
    let date = new Date();
    for (let i = 0; i < credit.time; i++) {
      let pay: tablePaymentType = {
        num: i + 1,
        date: this.editorDate(date.setMonth(date.getMonth() + 1)),
        interestPayment: this.round(res.overpayment / credit.time),
        loanPayment: this.round(res.creditSum / credit.time),
        totalPayment: this.round(res.totalSum / credit.time),
        credit: this.round(res.creditSum - this.round(res.creditSum / credit.time) * (i + 1))
      }
      table.push(pay);
    }

    table[credit.time - 1].interestPayment += table[credit.time - 1].credit;
    table[credit.time - 1].totalPayment += table[credit.time - 1].credit;
    table[credit.time - 1].credit = 0;

    return table;
  }
  //рассчет таблицы для дифференцированного кредита
  calcTableDifferent(credit: creditParamsType, res: resultCreditType): tablePaymentType[] {
    let table: tablePaymentType[] = [];
    let date = new Date();
    let debtPart = this.round(res.creditSum / credit.time);
    let monthRate = credit.rate / 12 / 100;
    for (let i = 0; i < credit.time; i++) {
      let pay: tablePaymentType = {
        num: i + 1,
        date: this.editorDate(date.setMonth(date.getMonth() + 1)),
        interestPayment: this.round((res.creditSum - (debtPart * i)) * monthRate),
        loanPayment: debtPart,
        totalPayment: this.round(debtPart + (res.creditSum - (debtPart * i)) * monthRate),
        credit: this.round(credit.sum - debtPart * (i + 1))
      }
      table.push(pay);
    }
    
    table[credit.time - 1].interestPayment += table[credit.time - 1].credit;
    table[credit.time - 1].totalPayment += table[credit.time - 1].credit;
    table[credit.time - 1].credit = 0;
    
    return table;
  }
  //метод для представления даты в нужном виде 
  editorDate(fullDate: number):string{

    const addNull = (num: number) => {
      if(num < 10){
        return '0' + num;
      }
      return num;
    }

    let editDate = '';
    let date = new Date(fullDate);

    editDate += addNull(date.getDate()) + '.';
    editDate += addNull((date.getMonth() + 1)) + '.';
    editDate += date.getFullYear();
    return editDate;
  }

  round(value: number): number {
    return Math.round(value * 100) / 100;
  }

}
