import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  addMyUserReq: any = {};
  addMyUserRes: any = {};
  addMyUserUrl: string =  environment.userUrl + 'addMyUser';

   myEmail: any = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.myEmail = localStorage.getItem('email');
    this.myEmail = JSON.parse(this.myEmail)
    if(!this.myEmail || this.myEmail == null){
      //nothing
    }else{
      this.router.navigate(['/cloud'])
    }
   }

  ngOnInit(): void {
  }

  addEvent(){
    this.http.post(this.addMyUserUrl, this.addMyUserReq).subscribe((res: any) =>{
      this.addMyUserRes = res;
      if(this.addMyUserRes.status == "success"){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: res.message
        })
        this.router.navigate(['/login'])
      }
      else{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: res.message
        })
      }
      
    }, err =>{
      alert(JSON.stringify(err))
    })
  }

}
