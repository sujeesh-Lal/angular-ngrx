import { Component, OnInit } from '@angular/core';
import { UpdateDemoItems, demoItemsList } from './../store';
import { select, Store, State } from '@ngrx/store';
import { IAppState } from './../../shared-service/models';
import * as dashboardStore from './../store';
import {
  routerState
} from './../../store';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  items$ = this.store.select(demoItemsList);
  routerData$ = this.store.pipe(select(routerState));

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store
      .select<any>((state: any) => state) // the complete state this time!!!
      .subscribe((completeState: any) => {
        console.log(completeState, 'tttt');
      });

    this.items$.subscribe((data) => {
      console.log(data, 'fff');
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
