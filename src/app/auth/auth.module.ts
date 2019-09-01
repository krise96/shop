import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzCheckboxModule, NzFormModule, NzGridModule, NzInputModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
  ]
})
export class AuthModule {
}
