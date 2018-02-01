import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'requests', component: RequestsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes/*, {enableTracing: true}*/)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
