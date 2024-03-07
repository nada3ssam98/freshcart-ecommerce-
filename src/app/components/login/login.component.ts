import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnDestroy{
  errMessage:string = ''
  isLoading:boolean = false
  subscribeId :Subscription = new Subscription()
  userData:any

  constructor(private _AuthService:AuthService , private _Router:Router){}
  loginForm: FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required, Validators.email]),
    password : new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)])
  })
  handleLogin(){
    this.isLoading = true
    this.subscribeId = this._AuthService.setLogin(this.loginForm.value).subscribe({
      next : (response) =>{
        localStorage.setItem('userToken',response.token)
        this._AuthService.saveUserData();
       console.log( this._AuthService.saveUserData());
       
        this.isLoading = false
        if(response.message == 'success'){
          this._Router.navigate(['/home'])
        }
      },
      error : (err:HttpErrorResponse) =>{
        this.isLoading = false
        this.errMessage = err.error.message
      }
    })
   
  }
  ngOnDestroy(): void {
    this.subscribeId.unsubscribe()

}
}
