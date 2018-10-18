import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BankbalanceserviceService } from '../../bankbalanceservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bankbalance-create',
  templateUrl: './bankbalance-create.component.html',
  styleUrls: ['./bankbalance-create.component.css']
})
export class BankbalanceCreateComponent implements OnInit {
  angForm: FormGroup;
  constructor(private bankbalanceservice : BankbalanceserviceService, private fb: FormBuilder,private route: ActivatedRoute,
    private router: Router ) {
   this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      bankname: ['', Validators.required ],
      accountnumber: ['', Validators.required ],
      customerid: ['', Validators.required ],
      accountholdername: ['', Validators.required ],
      bankbalance: ['', Validators.required ]
   });
  }

addBankBalance(bankname, accountnumber, customerid, accountholdername, bankbalance){
//  this.bankbalanceservice.addBankBalance(bankname, accountnumber, customerid, accountholdername, bankbalance);
this.route.params.subscribe(params => {
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var updatedate = date+' '+time;

  this.bankbalanceservice.addBankBalance(bankname, accountnumber, customerid, accountholdername, bankbalance, updatedate);
  this.router.navigateByUrl('bankbalances');
  window.location.reload();
});
}

  ngOnInit() {
  }

}
