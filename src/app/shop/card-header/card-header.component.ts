import { Component, OnInit } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {

  constructor(public cardService: CardService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cardService.updateCardStateForUser();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
