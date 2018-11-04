import { Component, Input } from '@angular/core';

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListComponent {
  private _bars: object[];

  get bars(): object[] {
    return this._bars;
  }

  @Input()
  set bars(bars: object[]) {
    console.log(bars);
    this._bars = bars;
  }

  constructor() {
    console.log('Hello ListComponent Component');
  }

}
