import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/components/product/product.component';
import { CardListComponent } from './card-list/card-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'card-list',
    component: CardListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
