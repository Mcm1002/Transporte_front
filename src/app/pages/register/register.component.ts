import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';


export function matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return ( control : AbstractControl) : {[key: string]: any} | null => {
    const password = control.get(passwordKey);
    const confirmPassword = control.get(confirmPasswordKey)?.value;
    return password==confirmPassword ? {'passwordmisMatch': true} : null;   
    }

}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(private router:Router, private fb:FormBuilder, private accountService:AccountService ) { }

  registerForm = this.fb.group({
    email: new FormControl('', [Validators.required,Validators.email] ),
    password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])[a-z\d]*(?=.*[^A-Za-z0-9]{2,}).{8,}$')] ),
    confirmPassword: new FormControl('')
  },{validators: matchPasswordValidator('password','confirmPassword')});

  ngOnInit() {}

  backToLogin() {
    //console.log('backToLogin');
    this.router.navigate(['/']);
  }
  
  submitForm(){
    console.log('submitForm');
    this.accountService.register(this.registerForm.value);

}
}