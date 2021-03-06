import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ReloadAppState, loaderState } from './store';
import { IAppState } from './shared-service/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<IAppState>) {

    this.isLoading = this.store.pipe(
      select((state: IAppState) => {
        return state.loader.active;
      })
    );

    this.isLoading.subscribe(data => console.log(data));

    this.loader = this.store.select(loaderState);

    this.loader.subscribe(data => console.log(data.message));
  }
  title = 'angular-ngrx';
  isLoading: any;
  loader;

  ngOnInit(): void {
  }

  resetState() {

    const aaa = {
      router: { state: { url: '/demo', queryParams: {}, params: {} }, navigationId: 1 },
      dashboardFeature: {
        demo: {
          items: [{ brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff' },
          { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' },
          { brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr' },
          { brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh' }]
        }
      }
    };

    this.store.dispatch(new ReloadAppState(aaa));
  }
}
