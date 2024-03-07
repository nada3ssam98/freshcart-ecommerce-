import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategryService } from 'src/app/shared/service/categry.service';

@Component({
  selector: 'app-subcateogries',
  templateUrl: './subcateogries.component.html',
  styleUrls: ['./subcateogries.component.css']
})
export class SubcateogriesComponent implements OnInit {
constructor(private _CategryService:CategryService , private _ActivatedRoute:ActivatedRoute){}
subcateogries:any ={}
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
     let categoryId = param.get('id')!
     this._CategryService.getSpecificCategory(categoryId).subscribe({
      next:(response)=>{
        this.subcateogries= response.data        
      },
      error:(err)=>{
        console.log(err);
      }
      
    })
    }
  })
}
}
