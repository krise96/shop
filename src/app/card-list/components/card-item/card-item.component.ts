import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItemType } from '../../models/card-item.types';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  @Input() productWithCount: CardItemType;
  @Output() deleteOutput = new EventEmitter<number>();

  constructor() { }

  onRemove(productId: number): void {
    this.deleteOutput.emit(productId);
  }

}
