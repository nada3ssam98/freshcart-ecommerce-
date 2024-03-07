import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interface/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  products:Product[]=[]
  wishlistData:any=[]
constructor(
  private _WishlistService:WishlistService,
  private _CartService:CartService,
  private _ToastrService:ToastrService
  ){}

ngOnInit(): void {

  this._WishlistService.getUserWishlist().subscribe({
    next :(response)=>{         
      const newData = response.data.map( (item:any)=> item._id)
      this.wishlistData = newData
      console.log(this.wishlistData);
      this.products = response.data
      
    }
  })
}

addToCart(productId:string):void{
  this._CartService.addToCart(productId).subscribe({
    next :(response)=>{
      console.log(response);
     
        this._ToastrService.success(response.message);
    },
    error : (err)=>{
      console.log(err);
      
    }
  })
}



addToWishlist(productId:string):void{
  this._WishlistService.addToWishlist(productId).subscribe({
    next:(response)=>{
      console.log(response.data)
      this.wishlistData = response.data
      this._ToastrService.success(response.message)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeFromWishlist(productId:string):void{
  this._WishlistService.removeFromWishlist(productId).subscribe({
    next:(response)=>{
      console.log(response.data)
      this.wishlistData = response.data
      this._ToastrService.success(response.message)
      
      this._WishlistService.getUserWishlist().subscribe({
        next:(response)=>{
          this.products = response.data
        }
      })
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}


}
