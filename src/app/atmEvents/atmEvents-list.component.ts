import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AtmService } from "../atm.service";

declare let toastr: any

@Component({
    templateUrl: './atmEvents-list.component.html',
    styles: [`
        .btn-info {
            min-width: 160px;
            max-width: 160px;
        }
        .btn-primary {
            min-width: 160px;
            max-width: 160px;
        }
    `]
    
})

export class AtmEventsListComponent implements OnInit{
    user: any;
    accountDetails: any;
    constructor( 
        private router : Router,
        private route: ActivatedRoute,
        private atmService: AtmService){
        
    }

    transactionId!: number;
    ngOnInit(): void {
        if(localStorage.getItem('user') != null){
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
            this.currentAccountDetails()
        }
        
        
    }

    transactionHistory(){
        this.router.navigate(['/transaction-history'], {queryParams : {userId : this.user.userId}})
    }

    currentAccountDetails(){
        this.atmService.getAccountDetails().subscribe(data => {
            
            var accData = data.filter(x => x['user'].userId == this.user.userId)
            
            this.accountDetails = '₹'+accData[0].accBalance
        })
    }
}
