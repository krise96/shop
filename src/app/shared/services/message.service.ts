import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private message: NzMessageService) {}

  public success(content: string): void {
    this.message.create('success', content);
  }

  public fail(content: string): void {
    this.message.create('error', content);
  }
}
