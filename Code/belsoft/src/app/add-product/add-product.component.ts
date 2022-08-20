import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  opened: boolean = true;
  image: any = "";
  imgUrl: any;

  addProductReq: any = {};
  addProductRes: any = {};
  addProductUrl: string = environment.itemUrl + 'addProduct';

  constructor(
    private http: HttpClient,
    private router: Router,
    public data: DataService
  ) {
    this.addProductReq.email = this.data.fetchEmail();
  }

  ngOnInit(): void {
  }

  uploadS3(event: any) {
    this.image = event.target.files[0];
    const contentType = this.image.type;
    const bucket = new S3(
      {
      accessKeyId: 'AKIAZFHLJ2HSQZPDAURB',
      secretAccessKey: '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',
      region: 'ap-south-1',
      }
    );

    const params = {
      Bucket: 'pdflinker',
      Key: this.image.name,
      Body: this.image,
      // ACL: 'public-read',
      ContentType: contentType
    };

    bucket.upload(params,  (err: any, data: any) => {
      if (err) {
      console.log('EROOR: ',JSON.stringify( err));
      return false;
      }
      this.imgUrl = data.Location
      console.log('File Uploaded.', this.imgUrl);
      return true;
    });
      
  }

  addItem(){
    this.addProductReq.imgUrl = this.imgUrl;
    console.log(JSON.stringify(this.addProductReq))
    this.http.post(this.addProductUrl,this.addProductReq).subscribe(res=>{
      this.addProductRes = res;
      console.log(JSON.stringify(this.addProductRes))
      if(this.addProductRes.status == "success"){
        alert(this.addProductRes.message)
      }
    },err=>{

    })
  }


}
