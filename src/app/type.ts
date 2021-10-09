export interface creditParamsType {
    sum: number,
    time: number,
    rate: number,
    type: number
  }
  
  export interface creditTimeType{
    val: number,
    text: string
  }
  
  export interface resultCreditType{
    creditSum: number, //сумма кредита
    monthPay: number, //платеж в месяц
    maxPay: number, //макс платеж
    minPay: number, //мин платеж
    totalSum: number, //общая сумма платежа
    overpayment: number, //сумма переплаты
    type: number //тип кредита 0 - аннуитентный, 1 - дифференциальный
  }
  
  export interface tablePaymentType{
    num: number,
    date: string,
    interestPayment: number,
    loanPayment: number,
    totalPayment: number,
    credit: number
  }