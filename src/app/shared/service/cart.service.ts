import { Product } from './../interface/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  header:any ={token:localStorage.getItem('userToken')}

  constructor(private _HttpClient:HttpClient) { }
  addToCart(productId:string) : Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
    {
      productId: productId
    },
    {
      headers: this.header,
    }
    )
  }

  getUserCart() : Observable <any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` ,
    {
      headers:this.header
    }
    )
  }

  removeItem(productId:string) : Observable <any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers:this.header
    }
    )
  }
  updateCartCount(productId:string , count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      
        count: count
    
    },
    {
      headers:this.header
    })
  }
  clearUserCart() : Observable <any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
    {
      headers:this.header
    }
    )
  }
  checkout(cartId:string ,userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://nada3ssam98.github.io/freshcart-ecommerce-/`
    ,{
      shippingAddress:userData
    },
    {
      headers:this.header
    }
    )
  }
  getUserOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }
}
