import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}
  //полчение процентной ставки по API для отображения при начальной загрузке сайта
  getData() {
    const addNull = (num: number) => {
      if(num < 10){
        return '0' + num;
      }
      return num;
    }

    let date = new Date();
    let reqDate = '';
    reqDate += date.getFullYear() + '-';
    reqDate += addNull((date.getMonth() + 1)) + '-'
    reqDate += addNull(date.getDate());

    return this.http.get('https://www.nbrb.by/API/RefinancingRate?onDate=' + reqDate);
  }
 
}
