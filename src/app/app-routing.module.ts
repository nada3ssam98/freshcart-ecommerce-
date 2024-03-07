import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { SubcateogriesComponent } from './components/subcateogries/subcateogries.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';

const routes: Routes = [
  {path:'', canActivate:[authGuard] ,component:BlankLayoutComponent, children:[
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home', component:HomeComponent ,title:'home'},
    {path:'details/:id', component:DetailsComponent ,title:'details'},
    {path:'cart', component:CartComponent,title:'cart'},
    {path:'checkout/:id', component:CheckoutComponent,title:'checkout'},
    {path:'products', component:ProductsComponent,title:'products'},
    {path:'categories', component:CategoriesComponent,title:'categories'},
    {path:'subcategory/:id', component:SubcateogriesComponent,title:'categories'},
    {path:'brands', component:BrandsComponent,title:'brands'},
    {path:'wishlist', component:WishlistComponent,title:'wishlist'},
    {path:'allorders', component:AllordersComponent,title:'order'},
  ]},
  {path:'', component:AuthLayoutComponent , children:[
    {path:'login', component:LoginComponent ,title:'login'},
    {path:'register', component:RegisterComponent,title:'register'},
  ]},
  {path:'**', component:NotfoundComponent ,title:'error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration : "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
