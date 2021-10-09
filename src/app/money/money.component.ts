import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent {

  constructor() { }

  @Input() set money(mon: number){
    this.pen = (mon - Math.trunc(mon)).toFixed(2).slice(1);
    this.rub =  Math.trunc(mon).toString();
  }
  rub: string = '';
  pen: string = '';

}
