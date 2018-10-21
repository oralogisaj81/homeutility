import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BankbalanceComponent } from './components/bankbalance/bankbalance.component';
import { BankbalanceCreateComponent } from './components/bankbalance-create/bankbalance-create.component';
import { BankbalanceEditComponent } from './components/bankbalance-edit/bankbalance-edit.component';
import { HomeutilitydashboardComponent } from './components/homeutilitydashboard/homeutilitydashboard.component';
import { FinancetrackerComponent } from './components/financetracker/financetracker.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';
import { BankbalanceserviceService } from './bankbalanceservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [
  {
    path: 'bankbalancecreate',
    component: BankbalanceCreateComponent
  },
  {
    path: 'bankbalanceedit/:id',
    component: BankbalanceEditComponent
  },
  {
    path: 'bankbalances',
    component: BankbalanceComponent
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeutilitydashboardComponent },
  { path: 'finance', component: FinancetrackerComponent },
  { path: 'bankbalances/bankbalancecreate', component: BankbalanceCreateComponent },
  { path: 'bankbalances/bankbalances', component: BankbalanceCreateComponent },
  { path: 'bankbalanceedited', component: BankbalanceEditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BankbalanceComponent,
    BankbalanceCreateComponent,
    BankbalanceEditComponent,
    HomeutilitydashboardComponent,
    FinancetrackerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
    ],
  providers: [ BankbalanceserviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
