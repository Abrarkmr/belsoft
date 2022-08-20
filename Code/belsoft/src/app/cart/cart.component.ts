import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  opened: boolean = true;

  fetchCartReq: any = {};
  fetchCartRes: any = {};
  fetchCartUrl: string = environment.itemUrl + 'fetchCart';

  constructor(
    private data: DataService,
    private http: HttpClient,
  ) { 
    this.fetchCartReq.email = this.data.fetchEmail();
  }

  ngOnInit() {
    console.log(JSON.stringify(this.data.fetchCartData()))
    this.getProducts()
  }

  getProducts(){
    this.http.post(this.fetchCartUrl,this.fetchCartReq).subscribe(res=>{
      this.fetchCartRes = res;
      if(this.fetchCartRes.status == "success"){
        alert(JSON.stringify(this.fetchCartRes))
      
      }
    },err=>{
      alert(err)
    })
  }

}
