import { Component, OnInit } from '@angular/core';
import { CategryService } from 'src/app/shared/service/categry.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit{
  constructor(private _CategryService:CategryService){}
  categoryDetails:any 
  categoryName:string = ''
  ngOnInit(): void {
    this._CategryService.getAllCategories().subscribe({
      next:(response)=>{
        this.categoryDetails = response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getSpecificCategory(categoryId:string): void {
    this._CategryService.getSpecificCategory(categoryId).subscribe({
      next:(response)=>{
        console.log(response.data);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
