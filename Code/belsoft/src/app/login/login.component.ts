import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateUserReq: any = {};
  validateUserRes: any = {};
  validateUserUrl: string = environment.userUrl + 'validateUser';

  checklogin: any

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checklogin = localStorage.getItem('token-belsoft');
    if(this.checklogin != null){
      this.checklogin = JSON.parse(this.checklogin);
      this.router.navigate(['dashboard'])
    }
   }

  ngOnInit(): void {
  }

  login(){
    this.http.post(this.validateUserUrl, this.validateUserReq).subscribe((res: any) =>{
      this.validateUserRes = res;
      if(this.validateUserRes.status == "success"){
        localStorage.setItem("token-belsoft", JSON.stringify(this.validateUserRes.email));
        this.router.navigate(['/home'])
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
      alert(JSON.stringify(err.error.text))
    })
  }

}
