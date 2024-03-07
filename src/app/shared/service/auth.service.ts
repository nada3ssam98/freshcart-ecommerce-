import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private _HttpClient:HttpClient , private _Router:Router) {}

    setRegister( setData:Object ) : Observable <any>
    {
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , setData)
    }
    setLogin(setData:object): Observable <any>
    {
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , setData)
    }
    saveUserData():any{
      //get token from localstorage
      //decode it
      //save it in local variable
      if(localStorage.getItem('userToken')!=null){
        let encodedToken:any = localStorage.getItem('userToken')
        let decodedToken = jwtDecode(encodedToken)
       return decodedToken
        
      }
    }
    logout():void{
      //delete token from localStorage
      //navigate to login
      localStorage.removeItem('userToken')
      this._Router.navigate(['/login'])

    }


  }

