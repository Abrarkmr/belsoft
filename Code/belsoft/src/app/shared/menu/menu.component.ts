import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  home(){
    this.router.navigate(['dashboard'])
  }
  events(){
    this.router.navigate(['events'])
  }
  product(){
    this.router.navigate(['addProduct'])
  }

}
