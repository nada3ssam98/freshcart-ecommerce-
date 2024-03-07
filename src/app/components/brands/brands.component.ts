import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/shared/service/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  allBrands:any
constructor(private _BrandService:BrandService , private _ActivatedRoute:ActivatedRoute){}
ngOnInit(): void {
  this._BrandService.getAllBrands().subscribe({
    next:(response)=>{
      console.log(response.data);
      this.allBrands = response.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
