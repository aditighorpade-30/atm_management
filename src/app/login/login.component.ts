import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router";
import { AtmService } from "../atm.service";
import { SharedService } from "../Datashring/shared.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    loginForm!: FormGroup
    submitted!: true
    data: any;
    loggedInUser: any
    usernameError!: boolean;
    passwordError!: boolean;
    

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private atmService: AtmService,
        private sharedService : SharedService // to share data from child to parent
        ){ }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
           
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    get f() { return this.loginForm.controls; }

    onSubmit(){
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
       
        this.data = {
            "username": this.loginForm.value.userName,
            "password": this.loginForm.value.password
        }

        this.atmService.getAllUsers().subscribe(allUser =>{
            // console.log(allUser);
            // this.data
            this.loggedInUser = allUser.find(x => x.userName == this.data.username)
            if(!this.loggedInUser){
                 this.usernameError = true;
            }

            if(this.loggedInUser.password != this.data.password){
                 this.passwordError = true;
            }else{
                console.log('logged in successfully');
                this.router.navigate(['/atmEvents'], {queryParams : {called_from : 'login', id : this.loggedInUser.userId}})
                alert('Welcome ' + this.loggedInUser.userName)
                localStorage.setItem('user', JSON.stringify(this.loggedInUser).toString())
                // window.location.reload()
                this.sharedService.nextMessage(this.loggedInUser) // to share data from child to parent
            }
            
        })

        
    }
    ngOnDestroy(){
        
      }
}
