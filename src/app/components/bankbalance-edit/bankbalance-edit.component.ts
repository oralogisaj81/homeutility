import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder, NgForm,  Validators } from '@angular/forms';
import { BankBalance } from '../../components/bankbalance/BankBalance';
import { BankbalanceserviceService } from '../../bankbalanceservice.service';

@Component({
  selector: 'app-bankbalance-edit',
  templateUrl: './bankbalance-edit.component.html',
  styleUrls: ['./bankbalance-edit.component.css']
})
export class BankbalanceEditComponent implements OnInit {

  bank_balance: any = {};
  angForm: FormGroup;
  id:string = '';
  bankname:string = '';
  accountnumber:string = '';
  customerid:string = '';
  accountholdername:string = '';
  bankbalance:string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bankbalanceservice: BankbalanceserviceService,
    private fb: FormBuilder) {
    this.createForm();
   }
   createForm() {
     this.angForm = this.fb.group({
       bankname: ['', Validators.required ],
       accountnumber: ['', Validators.required ],
       customerid: ['', Validators.required ],
       accountholdername: ['', Validators.required ],
       bankbalance: ['', Validators.required ],
    });
   }

onFormSubmit(form:NgForm) {
    this.bankbalanceservice.updateBankBalance(this.route.snapshot.params['id'], form)
      .subscribe(res => {
          //let id = res['_id'];
          this.router.navigate(['/bankbalances']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
    this.getBankRecord(this.route.snapshot.params['id']);
       this.angForm = this.fb.group({
         'bankname' : [null, Validators.required],
         'accountnumber' : [null, Validators.required],
         'customerid' : [null, Validators.required],
         'accountholdername' : [null, Validators.required],
         'bankbalance' : [null, Validators.required]
       });

  }

  getBankRecord(id) {
    this.bankbalanceservice.editBankBalance(id).subscribe(data => {
      console.log("inside getBankRecord(id) data val::", data);
        this.angForm.setValue({
        bankname: data.bankname,
        accountnumber: data.accountnumber,
        customerid: data.customerid,
        accountholdername: data.accountholdername,
        bankbalance: data.bankbalance
      });
    });
  }

}
