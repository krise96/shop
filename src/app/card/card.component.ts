import { Component } from '@angular/core';
import { CardService } from '../shared/services/card/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private cardService: CardService) { }


  get count(): number {
    return this.cardService.cardCount();
  }

}
