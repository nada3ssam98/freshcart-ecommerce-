import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  allProducts:any =[]
  wishlistData: any = []


constructor(
  private _EcomdataService:EcomdataService , 
  private _CartService:CartService, 
  private _ToastrService:ToastrService,
  private _WishlistService:WishlistService
  ){}

ngOnInit(): void { 
  this._EcomdataService.getAllProduct().subscribe({
    next:(respose:any)=>{
      console.log(respose);
      
      this.allProducts = respose.data
    }
  })
  
  this._WishlistService.getUserWishlist().subscribe({
    next :(response)=>{    
      const newData = response.data.map( (item:any)=> item._id)
      this.wishlistData = newData
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
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
