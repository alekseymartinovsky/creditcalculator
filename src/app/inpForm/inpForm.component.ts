import { Component, OnInit } from "@angular/core";
import { creditParamsType, creditTimeType } from "../type";
import { DataService } from "../data.service";
import { HttpService } from "../http.service";


@Component({
    selector: 'inp-form',
    templateUrl: 'inpForm.component.html',
    styleUrls: ['inpForm.component.scss'],
    providers: [HttpService]
})

export class InpFormComponent implements OnInit{

    creditParams: creditParamsType = {
        sum: 0,
        time: 0,
        rate: 0,
        type: 0
    };

    creditTime: creditTimeType[] = [];

    calc(){
        this.dataService.errorInput();
        this.dataService.calc();
    }

    changeType(newType: number){
        this.dataService.changeType(newType);
        this.calc();
    }

    constructor(private dataService: DataService, private httpService: HttpService){}
    
    ngOnInit(){
        this.creditParams = this.dataService.getCreditParams();
        this.creditTime = this.dataService.getCreditTime();
        this.httpService.getData().subscribe((data: any) => {
            this.creditParams.rate = data[0].Value + 5
            this.dataService.calc();
        });
        this.dataService.calc();
    }    

}