import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { PrimeThemeComponent } from './prime-theme/prime-theme.component';


const routes: Routes = [
  // { path: '', component: DemoComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'test', component: PrimeThemeComponent },
  {
    path: '',
    redirectTo: '/demo',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
