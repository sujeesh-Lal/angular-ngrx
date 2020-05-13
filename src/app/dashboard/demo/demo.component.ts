import { Component, OnInit } from '@angular/core';
import { ReloadAppState, UpdateDemoItems } from './../../store/actions';
import { select, Store } from '@ngrx/store';
import { IAppState } from './../../shared-service/models';
import {
  demoItemsList, routerState
} from './../../store/selectors';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  items$ = this.store.pipe(select(demoItemsList));
  routerData$ = this.store.pipe(select(routerState));

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.items$.subscribe((data) => {
      console.log(data);
    });
    this.routerData$.subscribe((data) => {
      console.log(data);
    });
  }

  dispatchAction() {
    // this.store.dispatch(new ReloadAppState({}));
    // this.store.dispatch(new UpdateDemoItems([{
    //   a: 'aaa5',
    //   b: 'bbb5',
    //   c: 'ccc5',
    // }]));
  }

}
