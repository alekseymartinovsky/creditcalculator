import { Component, OnInit } from '@angular/core';
import { resultCreditType } from '../type';
import { DataService } from '../data.service';


@Component({
  selector: 'app-result-credit',
  templateUrl: './result-credit.component.html',
  styleUrls: ['./result-credit.component.scss'],
})
export class ResultCreditComponent implements OnInit{

  constructor(private dataService: DataService){}

  resultCredit: resultCreditType = this.dataService.getResultCredit();
  //показывать детали выплат 
  viewDetails: boolean = false;

  changeViewDetails(){
    this.viewDetails = !this.viewDetails;
  }

  ngOnInit(){
    this.resultCredit = this.dataService.getResultCredit();
  }
  
  

}
