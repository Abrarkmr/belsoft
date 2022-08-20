import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count = 20;
  icon: boolean = true;
  
  constructor(
    public data: DataService,
    private router: Router,
  ) {
    
   }

  ngOnInit(): void {
    this.getCount()
  }

  getCount(){
    this.data.sendToheader()
  }

  cart(){
    this.router.navigate(['cart'])
  }

}
