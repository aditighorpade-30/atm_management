import { Component, OnInit } from "@angular/core";
import { Route, Router } from "@angular/router";
import { AtmService } from "../atm.service";
import { Transfer } from "../transfer";

@Component({
    templateUrl: './transferAmount.component.html'
})
export class TransferAmountComponent implements OnInit{
    transfer: Transfer = new Transfer();
    transfers: Transfer[] = []
    user: any;
    accountDetails: any
    allAccountDetails: any
    receiverAccExist = false;
    senderAccExist = false;
     
    constructor(
        private atmService: AtmService,
        private router: Router
        ){}
    ngOnInit(): void {
        if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
            this.currentAccountDetails()
        }
    }

    onSubmit(){
        this.transfer = {
            senderAccNo: this.transfer.senderAccNo,
            receiverAccNo: this.transfer.receiverAccNo,
            amount: this.transfer.amount
        }
        // this.atmService.getTransferAmount(data2)
        this.checkReceiverAccountExist(this.transfer.receiverAccNo)
        this.senderAccExist = (this.transfer.senderAccNo == this.accountDetails[0].accNo) ? true : false;
        if(this.senderAccExist == true){
            if(this.senderAccExist && this.receiverAccExist){
                this.senderAccExist = false;
                this.receiverAccExist = false;
                this.atmService.getTransferAmount(this.transfer).subscribe(data => {
                    console.log(data);
                    alert('Amount Transfered successfully');
                    this.router.navigate(['/atmEvents'])
                }); 
            }else{
                alert('Please Enter Correct Receiver Account No.');
            }
            
        }else if(this.senderAccExist == false){
            alert('Please Enter Correct Sender Account No.')
            this.senderAccExist = false
        }
        else{
            alert('Please Enter Correct Input.')
        }
       
    }

    currentAccountDetails(){
        this.atmService.getAccountDetails().subscribe(data => {
            this.allAccountDetails =  data
            this.accountDetails = data.filter(x => x['user'].userId == this.user.userId)
        })

    }
    
    checkReceiverAccountExist(receiverAccNo?: number){
        for(let i=0; i< this.allAccountDetails.length; i++){
            if(this.allAccountDetails[i].accNo == receiverAccNo){
                this.receiverAccExist = true;
                break;
            }else{
                this.receiverAccExist = false;
            }
        }
        // this.allAccountDetails.filter((x:any) => x.accNo == this.transfer.receiverAccNo)[0] === null
    }

}