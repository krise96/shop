import { Component } from '@angular/core';
import { CardService } from '../../core/services/card.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {

  constructor(private cardService: CardService, private authService: AuthService) { }

  public onLogout(): void {
    this.authService.logout();
  }
}
