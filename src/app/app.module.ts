import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CardHeaderComponent } from './shop/card-header/card-header.component';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './shop/product/product.module';
import { CardListModule } from './shop/card-list/card-list.module';
import { AboutComponent } from './shop/about/about.component';
import { LoginComponent } from './shop/login/components/login/login.component';
import { RegisterComponent } from './shop/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardHeaderComponent,
    RegisterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductModule,
    CardListModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, CardHeaderComponent]
})
export class AppModule { }
