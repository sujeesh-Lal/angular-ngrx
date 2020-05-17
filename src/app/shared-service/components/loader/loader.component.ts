import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loaderState } from './../../../store';
import { IAppState } from './../../models';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loader = this.store.select(loaderState);

  constructor(private store: Store<IAppState>) {

    // this.loader = this.store.select(loaderState);

    this.loader.subscribe(data => console.log(data.message));

  }


  ngOnInit(): void {
  }

}
