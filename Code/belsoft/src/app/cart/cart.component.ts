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
  showTable: boolean = true;

  fetchCartReq: any = {};
  fetchCartRes: any = [];
  fetchCartUrl: string = environment.itemUrl + 'fetchCart';

  removeCartReq: any = {};
  removeCartRes: any = {};
  removeCartUrl: string = environment.itemUrl + 'removeCart';

  constructor(
    private data: DataService,
    private http: HttpClient,
  ) { 
    this.fetchCartReq.email = this.data.fetchEmail();
  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.http.post(this.fetchCartUrl,this.fetchCartReq).subscribe(res=>{
      this.fetchCartRes = res;
      if(this.fetchCartRes.status == "success"){
        this.fetchCartRes =  this.fetchCartRes.products;
      
      }
    },err=>{
      alert(err)
    })
  }

  removeIt(tempId: any, productId: any){
    this.showTable = false;
    this.removeCartReq.tempId = tempId;
    this.removeCartReq.id = productId;
    this.http.delete(this.removeCartUrl,{body: this.removeCartReq}).subscribe(res=>{
      this.removeCartRes = res;
      if(this.removeCartRes.status == "success"){
        this.getProducts();
        this.showTable = true;
        alert(this.removeCartRes.message)
      }
    },err=>{
      alert(err)
      this.showTable = true;
    })
    this.showTable = true;
  }

}
