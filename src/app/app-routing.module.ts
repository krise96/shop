import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './shop/about/about.component';
import { ProductComponent } from './shop/product/components/product/product.component';
import { CardListComponent } from './shop/card-list/components/card-list/card-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'card-list',
    component: CardListComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
