import { Component, OnInit, ViewChild } from '@angular/core';
import {BankBalance} from './BankBalance';
import { BankbalanceserviceService } from '../../bankbalanceservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-bankbalance',
  templateUrl: './bankbalance.component.html',
  styleUrls: ['./bankbalance.component.css']
})
export class BankbalanceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

  bankbalances: BankBalance[];

  constructor(private bankbalanceservice: BankbalanceserviceService,private route: ActivatedRoute,
    private router: Router) { }

    displayedColumns: string[] = ['Bank Name', 'Account Number', 'Customer Id', 'Account Holder Name',
    'Bank Balance', 'Bank Balance Updated Date', 'Actions Edit', 'Actions Delete'];
    dataSource = new MatTableDataSource();

  ngOnInit() {
    //this.refreshBankBalances();
    this.bankbalanceservice
      .getBankBalances()
      .subscribe((data: BankBalance[]) => { setTimeout(() => {
      this.bankbalances = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
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
