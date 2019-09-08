import { NgModule } from '@angular/core';
import {
  en_US,
  NgZorroAntdModule,
  NZ_I18N,
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzGridModule, NzIconModule,
  NzInputModule, NzInputNumberModule, NzListModule, NzMenuModule, NzSelectModule, NzTagModule
} from 'ng-zorro-antd';



@NgModule({
  imports: [
    NgZorroAntdModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    NzListModule,
    NzInputNumberModule,
    NzMenuModule,
    NzTagModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  exports: [
    NgZorroAntdModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    NzListModule,
    NzInputNumberModule,
    NzMenuModule,
    NzTagModule,
  ]
})
export class NzModule { }
