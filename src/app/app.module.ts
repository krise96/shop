import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { CardListModule } from './card-list/card-list.module';

@NgModule({
  declarations: [
    AppComponent,
    CardHeaderComponent
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
