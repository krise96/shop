import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardHeaderComponent } from './shop/card-header/card-header.component';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './shop/product/product.module';
import { CardListModule } from './shop/card-list/card-list.module';
import { AboutComponent } from './shop/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    CardHeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductModule,
    CardListModule
  ],
  providers: [],
  bootstrap: [AppComponent, CardHeaderComponent]
})
export class AppModule { }
