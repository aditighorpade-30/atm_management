import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { AtmService } from "../atm.service";

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    data: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private atmService: AtmService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.data = {
            "firstname": this.registerForm.controls['firstName'].value,
            "lastname": this.registerForm.controls['lastName'].value,
            "username": this.registerForm.controls['userName'].value,
            "password": this.registerForm.controls['password'].value
        }

        this.atmService.createUser(this.data).subscribe(data => {
            console.log(data);
            alert('Registration successfully done!');
            this.router.navigate(['/login'])
        })
    }
}