import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CardHeaderComponent } from './shop/card-header/card-header.component';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './shop/product/product.module';
import { CardListModule } from './shop/card-list/card-list.module';
import { AboutComponent } from './shop/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OrderComponent } from './shop/order/order.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CardHeaderComponent,
    AboutComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // первый раз
    AppRoutingModule,
    AuthModule,
    AdminModule,
    SharedModule,
    ProductModule,
    CardListModule,
    ReactiveFormsModule,
    FormsModule,
    // HttpClientModule, // второй раз
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
