import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { tablePaymentType } from '../type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  table: tablePaymentType[] = [];

  ngOnInit(): void {
    this.table = this.dataService.getTable();
  }

}
