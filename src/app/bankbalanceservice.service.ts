import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankBalance } from './components/bankbalance/BankBalance';
import { Observable, of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BankbalanceserviceService {
    uri = 'http://localhost:4000/bankbalances';

  constructor(private http: HttpClient,private routes: ActivatedRoute) { }
  addBankBalance(bankname, accountnumber, customerid, accountholdername, bankbalance, updatedate){
    const obj = {
     bankname: bankname,
     accountnumber: accountnumber,
     customerid: customerid,
     accountholdername: accountholdername,
     bankbalance: bankbalance,
     updated_date: updatedate
   };
   this.http.post(`${this.uri}/add`, obj)
       .subscribe(res => console.log('Done'));
  }
  getBankBalances() {
   return this
          .http
          .get(`${this.uri}/`);
   }

   editBankBalance(id) :Observable<any> {
  return this
            .http
            .get(`${this.uri}/bankbalanceedit/${id}`);
  }
//   updateBankBalance(banknameone, accountnumber, customerid, accountholdername, bankbalance , id) {
//     console.log("inside bankbalanceservice.service.ts got param values::id::",id);
//     const obj = {
//      bankname: banknameone,
//      accountnumber: accountnumber,
//      customerid: customerid,
//      accountholdername: accountholdername,
//      bankbalance: bankbalance
//    };
//   this
//     .http
//      .post(`${this.uri}/update/${id}`, obj)
//     .subscribe(res => console.log('Done'));
// }
updateBankBalance(id, data): Observable <any>{
console.log("inside bankbalanceservice.service.ts got param values::id::",id);
const url = `${this.uri}/update/${id}`;
  return this.http.post(url, data);
}

deleteBankBalance(id) {
  console.log('inside bankbalanceservice.service.ts ...about to delete ');
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
}
}
