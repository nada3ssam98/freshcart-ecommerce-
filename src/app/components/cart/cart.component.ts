import { Product } from './../../shared/interface/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartDetails:any = {}
constructor(private _CartService:CartService){}

ngOnInit(): void {
   this._CartService.getUserCart().subscribe({
      next :(response)=>{
        this.cartDetails = response.data //{totalCartPrice ,products={price , count , product}
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

remveItem(id:string):void{
    this._CartService.removeItem(id).subscribe({
      next : (response)=>{
        this.cartDetails = response.data;
        
        //this.cartDetails = response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

updateCart(id:string , count:number):void{
  if(count > 0){
    this._CartService.updateCartCount(id , count).subscribe({
      next:(response)=>{
        this.cartDetails = response.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}

clearCart():void{
  this._CartService.clearUserCart().subscribe({
    next:(response)=>{
      if(response.message == 'success'){
        this.cartDetails = null
      }
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}


}

