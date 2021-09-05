import { Component, OnInit } from '@angular/core';
import { GlobalService } from './store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private service: GlobalService) {}

  ngOnInit() {
    this.initState();
  }

  private initState() {
    this.service.setupStateFromStorage();
  }
}
