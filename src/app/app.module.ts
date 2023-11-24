import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AtmEventsListComponent } from './atmEvents/atmEvents-list.component';
import { DepositComponent } from './atmEvents/deposit.component';
import { TransactionHistoryComponent } from './atmEvents/transactionHistory.component';
import { TransferAmountComponent } from './atmEvents/transferAmount.component';
import { WithdrawComponent } from './atmEvents/withdraw.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './nav/navbar.component';
import { RegisterComponent } from './register/register.component';
import { appRoutes } from './routes';
import { UserRatingComponent } from './rating/user-rating/user-rating.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AtmEventsListComponent,
    NavbarComponent,
    TransactionHistoryComponent,
    TransferAmountComponent,
    WithdrawComponent,
    DepositComponent,
    RegisterComponent,
    LoginComponent,
    UserRatingComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
