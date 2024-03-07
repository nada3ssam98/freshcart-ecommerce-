import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{
  errMessage : string = '';
  isLoading:boolean = false;
  subscribeId!:Subscription
  
  constructor(private _AuthService:AuthService , private _Router:Router){}
  registerationForm:FormGroup = new FormGroup({
    name:new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email:new FormControl('' , [Validators.required, Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
    rePassword:new FormControl('' ),
    phone:new FormControl('' , [Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]),
} ,{validators:[this.confirmPassword]} as FormControlOptions)

confirmPassword(group:FormGroup):void{
  let password = group.get('password')
  let rePassword = group.get('rePassword')
  if(rePassword?.value == ''){
    rePassword?.setErrors({required:true})
  }
 else if(password?.value != rePassword?.value){
    rePassword?.setErrors({mismatch :true})
  }

}

handleForm():void{
  if(this.registerationForm.valid){

    this.isLoading = true
    this.subscribeId = this._AuthService.setRegister(this.registerationForm.value).subscribe({

      next : (response)=>{
        if(response.message == 'success')
        this.isLoading = false;
        this._Router.navigate(['/login'])
      },

      error: (err:HttpErrorResponse) => {
        this.isLoading = false
        this.errMessage = err.error.message

      }
    })
  }
}
ngOnDestroy(): void {
  this.subscribeId?.unsubscribe()
}
}