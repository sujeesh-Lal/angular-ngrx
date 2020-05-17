// import { Injectable } from '@angular/core';
// import { Actions } from '@ngrx/effects';


// @Injectable()
// export class AppEffects {

//   constructor(private actions$: Actions) { }

// }

import { LoadingIndicatorEffects } from './loader.effects';

// export const AppEffects: any = [
//   LoadingIndicatorEffects
// ];

export const AppEffects = [LoadingIndicatorEffects];

// export * from './demo.effects';


