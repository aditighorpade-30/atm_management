import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Transaction } from "./transaction";
import { Transfer } from "./transfer";
import { Withdraw } from "./withdraw";
import { Deposit } from "./deposit";
import { User } from "./user";
import { Account } from "./account";
import { Rating } from "./rating";

@Injectable({
    providedIn: 'root'
})
export class AtmService{
    private baseURL = "http://localhost:8080/api/user"


    constructor(private httpClient: HttpClient){

    }

    getTransactionsList(): Observable<Transaction[]>{
        return this.httpClient.get<Transaction[]>(`${this.baseURL + '/transactions'}`);
    }
    getTransferAmount(transfer: any){
        console.log(transfer);
        let body = {
            senderAccNo: transfer.senderAccNo,
            receiverAccNo: transfer.receiverAccNo
        }
        return this.httpClient.post<Transfer>(`${this.baseURL + '/transfer' + '/' + transfer.senderAccNo +'/' + transfer.receiverAccNo + '/' + transfer.amount}`, body)
    }

    getWithdrawAmount(withdraw: any){
        console.log(withdraw);
        
        return this.httpClient.put<Withdraw>(`${this.baseURL + '/withdraw' + '/' + withdraw.accNo +'/' + withdraw.amount}`, null)
    }
    
    getDepositAmount(deposit: any){
        console.log(deposit);
        let body = {
            accNo: deposit.accNo,
        }
        
        return this.httpClient.put<Deposit>(`${this.baseURL + '/deposit' + '/' + deposit.accNo +'/' + deposit.amount}`, body)
    }

    createUser(user: any){
        console.log(user);
        let body = {
            userName: user.username,
            password: user.password,
            firstName: user.firstname,
            lastName:user.lastname
        }
        return this.httpClient.post<User>(`${this.baseURL + '/create'}`, body)
    }

    getAllUsers(): Observable<User[]>{
        return this.httpClient.get<User[]>(`${this.baseURL + '/getUsers'}`);
    }

    getAccountDetails(): Observable<Account[]>{
        return this.httpClient.get<Account[]>(`${this.baseURL + '/accounts'}`);
    }

    getRatingsList(): Observable<Rating[]>{
    return this.httpClient.get<Rating[]>(`${this.baseURL +'/ratings'}`);
  }

  giveRating(rating: Rating): Observable<Object>{
    console.log(rating);
    
    return this.httpClient.post(`${this.baseURL +'/rating'}`, rating);
  }

}