import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchData } from './store/actions';
import { IAppState } from './shared-service/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-ngrx';

  constructor(private store: Store<IAppState>) { }
  ngOnInit(): void {
    this.store.dispatch(new FetchData());
  }
}
