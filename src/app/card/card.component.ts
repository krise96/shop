import { Component, OnInit } from '@angular/core';
import { CardService } from '../shared/services/card/card.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private cardService: CardService, private authService: AuthService) { }

  ngOnInit() {
  }

  get count(): number {
    return this.cardService.cardCount();
  }

}
