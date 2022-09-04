import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  utoken: any;
  opened: boolean = true;
  countt: any = 0;

  viewProductsReq: any = {};
  viewProductsRes: any = {};
  viewProductsUrl: string = environment.itemUrl + 'viewProducts';
  
  addToCartReq: any = {};
  addToCartRes: any = {};
  addToCartUrl: string = environment.itemUrl + 'addToCart';

  myProducts : any = [];

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router
  ) { 
    this.utoken = localStorage.getItem('token-belsoft');
    if(this.utoken != null){
      this.utoken = JSON.parse(this.utoken);
      data.token = this.utoken;
    }
    this.countt = localStorage.getItem('count');
    if(this.countt != null){
      this.countt = JSON.parse(this.countt);
    }
    this.viewProductsReq.email = this.data.fetchEmail();
  }

  ngOnInit(): void {
    this.fetchProducts()
  }

  adder(id: any){
    this.addToCartReq.id = id;
    this.addToCartReq.email = this.data.fetchEmail();
    this.http.post(this.addToCartUrl,this.addToCartReq).subscribe(res=>{
      this.addToCartRes = res;
      if(this.addToCartRes.status == "success"){
        localStorage.setItem('cCount',this.addToCartRes.count)
        this.data.count = this.addToCartRes.count;
        alert(this.addToCartRes.message)
      }
    },err=>{
      alert(err)
    })
   
  }

  fetchProducts(){
    this.http.post(this.viewProductsUrl,this.viewProductsReq).subscribe(res=>{
      this.viewProductsRes = res;
      if(this.viewProductsRes=="No products found for the user. Try adding the products."){
        alert("No products found for the user. Try adding the products.")
      }
      if(this.viewProductsRes.status == "success"){
        this.myProducts = this.viewProductsRes;       
      }
    },err=>{
      alert(err)
    })
  }

}
