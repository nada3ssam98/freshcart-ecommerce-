import { Product } from './shared/interface/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(products : Product[] , seachInput:string ): Product[] {
    return products.filter( 
      (product)=>product.title.toLocaleLowerCase().includes(seachInput.toLocaleLowerCase())
      );
  }

}
