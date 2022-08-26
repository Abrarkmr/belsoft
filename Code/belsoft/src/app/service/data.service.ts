import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: any;
  count: any;
  email: any;

  cartdata: any = [];

  constructor() { }


  sendToheader(){
    return this.count
  }

  fetchEmail(){
    this.email = localStorage.getItem('token-belsoft');
    this.email = JSON.parse(this.email );
    return this.email;
  }

  setCartData(data: any){
    this.cartdata.push(data.cart);
    localStorage.setItem('cart', JSON.stringify(this.cartdata));
    // this.cartdata.push(data);
    // this.fetchCartData()
  }

  fetchCartData(){
    this.cartdata = localStorage.getItem('cart');
    this.cartdata = JSON.parse(this.cartdata);
    return this.cartdata;
  }
  
}
