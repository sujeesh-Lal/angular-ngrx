import { Component, OnInit } from '@angular/core';
import { ReloadAppState } from './../../store/actions';
import { select, Store } from '@ngrx/store';
import { IAppState } from './../../shared-service/models';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
  }

  dispatchAction() {
    this.store.dispatch(new ReloadAppState({}));
  }

}
