import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(private router:Router, private fb:FormBuilder, private accountService:AccountService,
    private alertController:AlertController) { }
  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required,Validators.email] ),
    password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Z])[a-z\d]*(?=.*[^A-Za-z0-9]{2,}).{8,}$')] )
  });

  ngOnInit() {}

  toRegister() {
    //console.log('toRegister');
    this.router.navigate(['registro']);
  }

  submitLoginForm(){
    console.log('SubmitLoginForm');
    this.accountService.loginUser(this.loginForm.value).subscribe({
      next: (resp:any)=>{
        console.log(resp);
        localStorage.setItem('token',resp['token']);
        this.router.navigate(['/home/tabs/tab1']);
      },
      error: async err=>{
        console.log(err);
        const alert = await this.alertController.create({
          header: 'Error al iniciar sesión',
          message: err.error.message,
          buttons: ['OK']
        });
        await alert.present();
      }

    });
  }
  
}
 