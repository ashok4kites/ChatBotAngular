import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent {
  @Input('selected') isSelected: boolean = false;
  @Input('isDetailed') isDetailed: boolean = false;
  constructor() { }
}
