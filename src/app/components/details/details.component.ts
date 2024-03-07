import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/service/cart.service';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  productDetails:any = {}
  productDetailsSlider: OwlOptions = {
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
  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService , private _CartService:CartService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next : (params)=>{
        let productId = params.get('id') !;
        this._EcomdataService.getSpecificProduct(productId).subscribe({
          
          next : (response)=>{
          this.productDetails = response.data;
          }
        })
      }
    })
  }
  addToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next :(response)=>{
        console.log(response);
        
      },
      error : (err)=>{
        console.log(err);
        
      }
    })
  }
}
