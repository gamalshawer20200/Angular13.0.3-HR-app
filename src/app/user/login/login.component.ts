import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formValue !: FormGroup;
  loginModelObject: any = {username: '' , password:'' }



  constructor(
    private formbuilder: FormBuilder,
    private router:Router,
    private api: ApiService,
    private notification: NotificationsService


  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: [''],
      password: [''],
    })
  }

  login(){
    this.loginModelObject.username = this.formValue.value.username
    this.loginModelObject.password = this.formValue.value.password

    this.api.login(this.loginModelObject)
    .subscribe(res=>{
      // console.log('************OOOOPPPPPP'+JSON.stringify(res))
      // this.notification.success('Success',`Hello ${res.username}`)
      alert('Loged in sucessfully')
      localStorage.setItem("userID",res.EMPLOYEE_ID)
      localStorage.setItem("token",res.token)
      localStorage.setItem("role",res.role)
      this.formValue.reset()
      this.router.navigate(['/home'])
    },
    err=>{
      console.log(this.loginModelObject)
      console.log(err);
      this.notification.error('Error','Failed to Login')
      alert(err.error.message)
    })
  }

  loggedIn(){
    return localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
