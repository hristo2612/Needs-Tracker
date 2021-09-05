import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { GlobalStore, State } from './store';

@Injectable(
  { providedIn: 'root' }
)
export class GlobalQuery extends Query<State> {
  allState$ = this.select();
  today$ = this.select(state => state.today);
  todaysNeeds$ = this.select(state => state.today.map(progress => progress.need));
  history$ = this.select(state => state.history);
  settings$ = this.select(state => state.settings);
  
  constructor(protected store: GlobalStore) {
    super(store);
  }
}