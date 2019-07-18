import { Component } from '@angular/core';
import { CardService } from '../shared/services/card/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {

  constructor(private cardService: CardService) { }


  get count(): number {
    return this.cardService.cardCount();
  }

}
