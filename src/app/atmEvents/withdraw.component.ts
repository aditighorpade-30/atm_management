import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AtmService } from "../atm.service";
import { Withdraw } from "../withdraw";

@Component({
    templateUrl: './withdraw.component.html'
})
export class WithdrawComponent implements OnInit{
    withdraw: Withdraw = new Withdraw();
    accountDetails: any;
    user: any;
    constructor(private atmService: AtmService, private router: Router){}

    ngOnInit(){
        if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
            this.currentAccountDetails()
        }
    }

    onSubmit(){
        this.withdraw;
        let withdraw = {
            accNo: this.withdraw.accNo,
            amount: this.withdraw.amount
        }
        // this.atmService.getTransferAmount(data2)
        if(withdraw.accNo == this.accountDetails[0].accNo){
            this.atmService.getWithdrawAmount(withdraw).subscribe(data => {
                console.log(data);
                alert('Amount Withdraw successfully');
                this.router.navigate(['/rating'])
            }); 
        }else{
            alert('Please Enter Correct Account No.')
        }
    }

    currentAccountDetails(){
        this.atmService.getAccountDetails().subscribe(data => {
            this.accountDetails = data.filter(x => x['user'].userId == this.user.userId)
        })
    }

}