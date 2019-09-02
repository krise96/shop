import { Component } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {

  // authService - должен быть публичный, если используется в шаблоне
  constructor(public cardService: CardService, private authService: AuthService) { }

  public onLogout(): void {
    this.authService.logout();
  }
}
