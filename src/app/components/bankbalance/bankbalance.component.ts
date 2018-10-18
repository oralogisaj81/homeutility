import { Component, OnInit } from '@angular/core';
import {BankBalance} from './BankBalance';
import { BankbalanceserviceService } from '../../bankbalanceservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bankbalance',
  templateUrl: './bankbalance.component.html',
  styleUrls: ['./bankbalance.component.css']
})
export class BankbalanceComponent implements OnInit {

  bankbalances: BankBalance[];

  constructor(private bankbalanceservice: BankbalanceserviceService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshBankBalances();
  }

 refreshBankBalances(){
   this.bankbalanceservice
     .getBankBalances()
     .subscribe((data: BankBalance[]) => {
     this.bankbalances = data;
   });
 }

  deleteBankBalance(id) {
      this.route.params.subscribe(params => {
      console.log('inside bankbalance.component.ts ...about to delete ');
      this.bankbalanceservice.deleteBankBalance(id).subscribe(res => {
        console.log('Deleted');
        this.router.navigateByUrl('bankbalances');
        window.location.reload();
      });
  });
}
}
