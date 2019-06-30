import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorComponent } from './vendor/vendor.component';
import { TestComponent } from './test/test.component';
import { LotComponent } from './lot/lot.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendors', component: VendorComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: VendorDetailComponent },
  { path: 'test', component: TestComponent},
  { path: 'lots', component: LotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
