import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{
  
 orderData:any[]=[]

  constructor(private _CartService:CartService, private _AuthService:AuthService ){}
ngOnInit(): void {
    
      let userData = this._AuthService.saveUserData()
      this._CartService.getUserOrders(userData.id).subscribe({
      next:(response)=>{
        this.orderData = response
        console.log(response);
        
        
      }
    })
  }
}

