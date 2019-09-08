import { Component } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {

  constructor(
    public cardService: CardService,
    public authService: AuthService,
  ) { }

  public onLogout(): void {
    this.authService.logout();
  }
}
