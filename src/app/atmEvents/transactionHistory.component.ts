import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AtmService } from "../atm.service";
import { Transaction } from "../transaction";

@Component({
    templateUrl: './transactionHistory.component.html'
})
export class TransactionHistoryComponent implements OnInit{
    transactions:Transaction[] = []
    user_transaction : any;

    constructor(private atmService: AtmService, private router: Router){}

    ngOnInit(): void {
        this.getTransactions();
    }

    private getTransactions(){
        this.atmService.getTransactionsList().subscribe(data => {
            // this.transactions = data;
            data;
            // console.log(this.transactions);
            let user = JSON.parse(localStorage.getItem('user') || '{}');
            for(let i=0; i< data.length; i++){
                if(data[i].account.user.userId == user.userId){
                    // this.transactions[0].account.user.userId == user.userId
                    this.transactions.push(data[i])
                }
            }
        });
    }
}