import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from '../employee-dashboard/employee-dashBoard.model';
import { ApiService } from '../api/api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ID : any = localStorage.getItem("userID")
  PIC !: File 
  url :any = ""
  selectedFile !: File
  loading !:boolean

  employeeData: EmployeeModel = new EmployeeModel()
  formValue !: any
  UpdateID!: any
  updatedData :any = {
    username: '',
    password: '',
    EMAIL: '',
    PHONE_NUMBER: '',
    ADRESS: '',
    AGE: '',
    FIRST_NAME: '',
    LAST_NAME: '',
    BBX: '',
    PICTURE:'',
  }

  constructor(    
    private formbuilder: FormBuilder,
    private router:Router,
    private api: ApiService,
    private notification:NotificationsService,
  ) { }

  ngOnInit(): void {
    this.api.getEmployeeById(this.ID).subscribe(res=>{
      //resolve the response Object res --> {username: "" , contactInfo:[{}]} 
      //to be {username:"", contactInfo:{}}  without array!
      console.log(res)
      const c = res.contactInfo[0]
      delete res.contactInfo
      const y = {...res , contactInfo:{...c}}
      console.log(y)
      this.employeeData = y
    this.notification.success('Loged In',`Hello Mr. ${this.employeeData.username}`,{
      timeOut: 7000
    })

    })
    
    this.api.getImageByEmployeeId(this.ID).subscribe(res=>{
      // console.log(res.fileName)
      // console.log(typeof String(res.filenName))
      const x = String(res.fileName)
      this.url = `assets/${x}`
      
    })

    this.formValue = this.formbuilder.group({
      username: [''],
      password: [''],
      EMAIL: [''],
      FIRST_NAME: [''],
      LAST_NAME: [''],
      PHONE_NUMBER: [''],
      BBX: [''],
      ADDRESS: [''],
      SALARY:[''],
      HIRE_DATE:[''],
      PICTURE:['']
      
    })

    this.loading = false

  }

  onEdit(){
    console.log(this.employeeData)
    this.UpdateID = this.ID
    this.formValue.controls['FIRST_NAME'].setValue(this.employeeData.contactInfo.FIRST_NAME)
    this.formValue.controls['LAST_NAME'].setValue(this.employeeData.contactInfo.LAST_NAME)
    this.formValue.controls['PHONE_NUMBER'].setValue(this.employeeData.contactInfo.PHONE_NUMBER)
    this.formValue.controls['SALARY'].setValue(this.employeeData.contactInfo.SALARY)
    this.formValue.controls['ADDRESS'].setValue(this.employeeData.contactInfo.ADDRESS)
    this.formValue.controls['username'].setValue(this.employeeData.username)
    // this.formValue.controls['password'].setValue(this.employeeData.password)
    this.formValue.controls['BBX'].setValue(this.employeeData.contactInfo.BBX)
    this.formValue.controls['EMAIL'].setValue(this.employeeData.contactInfo.EMAIL)
    this.formValue.controls['HIRE_DATE'].setValue(this.employeeData.contactInfo.HIRE_DATE)
  }

  updateEmployeeDetails(){
    // delete this.employeeData.contactInfo[0]
    this.employeeData.username = this.formValue.value.username
    this.employeeData.password = this.formValue.value.password
    this.employeeData.contactInfo.EMAIL = this.formValue.value.EMAIL
    this.employeeData.contactInfo.PHONE_NUMBER = this.formValue.value.PHONE_NUMBER
    this.employeeData.contactInfo.ADDRESS = this.formValue.value.ADDRESS
    // this.employeeModelObj.AGE = this.formValue.value.age
    this.employeeData.contactInfo.FIRST_NAME = this.formValue.value.FIRST_NAME
    this.employeeData.contactInfo.LAST_NAME = this.formValue.value.LAST_NAME
    this.employeeData.contactInfo.BBX = this.formValue.value.BBX
    this.employeeData.contactInfo.SALARY = this.formValue.value.SALARY
    this.employeeData.contactInfo.HIRE_DATE = this.formValue.value.HIRE_DATE


    this.api.updateEmployee(this.employeeData,this.UpdateID)
    .subscribe(res=>{
      console.log(res)
      this.formValue.reset()
      // alert("Employee updated Successfully")
      this.notification.success('Success','Employee Updated Succesfully')
      let ref = document.getElementById("cancel")
      ref?.click()
    },
    err=>{
      console.log(this.employeeData)
      this.notification.error('Error',err.error.message)
      // alert("somethins went wrong on UPDATING ! ")
    })

  }

  onFileSelected(event:any){
      this.selectedFile = <File> event.target.files[0]
      document.getElementById('pick')!.setAttribute("disabled","disabled")
      document.getElementById('pick')!.innerText = 'Image Selected'
      // document.getElementById('pick')!.style.cssText = 'cursor: progress'
    }

  onFileUpload(){
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.loading = true
    this.api.onFileUpload(fd,this.ID).subscribe(res=>{
      this.loading = true
      let ref = document.getElementById("reload")
      ref?.click()
    })
  }

  reloadCurrentPage() {
    window.location.reload();
   }

   RouteToFindAllEmployees(){
    this.router.navigate(['/Dashboard'])
   }
   RouteToFindAllDepartments(){
    this.router.navigate(['/department'])
   }
   RouteToFindSuspendedUsers(){
    this.router.navigate(['/suspend'])
  }
}
