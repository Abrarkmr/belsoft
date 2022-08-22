import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AddProductComponent} from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '' , component: LoginComponent},
  { path: 'dashboard' , component: DashboardComponent},
  { path: 'events' , component: EventsComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: 'addProduct' , component: AddProductComponent},
  { path: 'cart' , component: CartComponent},
  { path: '**' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
