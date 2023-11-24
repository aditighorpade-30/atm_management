import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AtmService } from "../atm.service";
import { Deposit } from "../deposit";

@Component({
    templateUrl: './deposit.component.html'
})
export class DepositComponent implements OnInit{
    deposit: Deposit = new Deposit;
    user: any;
    accountDetails: any
    constructor(private atmService: AtmService, private router: Router){}
    ngOnInit(){
        if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
            this.currentAccountDetails()
        }
    }
    
    onSubmit(){
        this.deposit;
        let deposit = {
            accNo: this.deposit.accNo,
            amount: this.deposit.amount
        }
        // this.atmService.getTransferAmount(data2)
        if(deposit.accNo == this.accountDetails[0].accNo){
            this.atmService.getDepositAmount(deposit).subscribe(data => {
                console.log(data);
                alert('Amount Deposit successfully');
                this.router.navigate(['/atmEvents'])
            });   
        }else{
            alert('Please Enter Correct Account No.')
        }
    }

    currentAccountDetails(){
        this.atmService.getAccountDetails().subscribe(data => {
            console.log(data);
            
            this.accountDetails = data.filter(x => x['user'].userId == this.user.userId)
        })
    }

}