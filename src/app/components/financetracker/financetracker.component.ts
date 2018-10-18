import { Component, OnInit } from '@angular/core';
import {FinanceTracker} from './financetracker';

@Component({
  selector: 'app-financetracker',
  templateUrl: './financetracker.component.html',
  styleUrls: ['./financetracker.component.css']
})
export class FinancetrackerComponent implements OnInit {
  financecategoryone: FinanceTracker = {
    id: 1,
    name: 'Bank account balance'
  };
  financecategorytwo: FinanceTracker = {
    id: 2,
    name: 'Bank amount transfer recorder'
  };
  constructor() { }

  ngOnInit() {
    console.log("inside FinancetrackerComponent...");
  }

}
