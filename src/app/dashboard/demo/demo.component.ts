import { Component, OnInit } from '@angular/core';
import { select, Store, State } from '@ngrx/store';
import { IAppState } from './../../shared-service/models';
import * as dashboardStore from './../store';
import * as rootStore from './../../store';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  items$ = this.store.select(dashboardStore.demoItemsList);
  routerData$ = this.store.pipe(select(rootStore.routerState));

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store
      .select<any>((state: any) => state) // the complete state this time!!!
      .subscribe((completeState: any) => {
        console.log(JSON.stringify(completeState), 'tttt');
      });

    this.items$.subscribe((data) => {
      console.log(data, 'fff');
    });
    this.routerData$.subscribe((data) => {
      console.log(data);
    });
  }

  dispatchAction() {
    this.store.dispatch(new dashboardStore.FetchData());
  }

}
