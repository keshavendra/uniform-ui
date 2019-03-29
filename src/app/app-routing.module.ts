import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendors', component: VendorComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: VendorDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
