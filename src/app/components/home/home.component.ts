import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interface/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products : Product[] = []
  categories : Product[] = []
  filterInput : string = ''
  wishlistData: any = []
  constructor(
    private _EcomdataService:EcomdataService , 
    private _CartService:CartService , 
    private _ToastrService:ToastrService,
    private _WishlistService:WishlistService
    ){}

  categorySliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  homeSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }


  ngOnInit(): void {
    
    this._EcomdataService.getAllProduct().subscribe({
      next: (response)=>{
        this.products = response.data
      }
    });


    this._EcomdataService.getAllCategories().subscribe({
      next :(response)=>{    
        this.categories = response.data  
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
