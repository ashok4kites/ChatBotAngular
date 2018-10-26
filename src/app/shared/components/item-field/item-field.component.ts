import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'item-field',
  templateUrl: './item-field.component.html',
  styleUrls: ['./item-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFieldComponent {
  @Input('label') label: string
  @Input('value') value: string
  @Input('subDesc') subDesc: string
  @Input('searchTerm') searchTerm?: string
  constructor() { }
}
