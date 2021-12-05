import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../api/api.service';
import { EmployeeModel } from './employee-dashBoard.model';
// import {MatTableDataSource} from '@angular/material/table'; 


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel()
  employeeData !: any
  UpdateID : any
  showAdd !: boolean
  showUpdate !: boolean
  url : any = ""
  viewEmployeeModelObj : EmployeeModel = new EmployeeModel()
  viewEmployeeID !: any
  selectedFile !: File
  loading !:boolean

  searchValue !: string

  // dataSource = new MatTableDataSource(this.employeeData)


  constructor
  (
    private formbuilder: FormBuilder,
    private router:Router,
    private api: ApiService,
    private notification: NotificationsService
  ) { }
  
  ngOnInit(): void {
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
      HIRE_DATE:['']
      
    })
    this.getAllEmployee()
  }

  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }

  postEmployeeDetails(){
    this.employeeModelObj.username = this.formValue.value.username
    this.employeeModelObj.password = this.formValue.value.password
    this.employeeModelObj.contactInfo.EMAIL = this.formValue.value.EMAIL
    this.employeeModelObj.contactInfo.PHONE_NUMBER = this.formValue.value.PHONE_NUMBER
    this.employeeModelObj.contactInfo.ADDRESS = this.formValue.value.ADDRESS
    // this.employeeModelObj.AGE = this.formValue.value.age
    this.employeeModelObj.contactInfo.FIRST_NAME = this.formValue.value.FIRST_NAME
    this.employeeModelObj.contactInfo.LAST_NAME = this.formValue.value.LAST_NAME
    this.employeeModelObj.contactInfo.BBX = this.formValue.value.BBX
    this.employeeModelObj.contactInfo.SALARY = this.formValue.value.SALARY
    this.employeeModelObj.contactInfo.HIRE_DATE = this.formValue.value.HIRE_DATE

    delete this.employeeModelObj.department

    
    console.log(this.employeeModelObj)
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res)
      this.notification.success('Suscess','Employee Added SuccessFully')
      // alert("Employee Added Successfully")
      let ref = document.getElementById("cancel")
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
    },
    err=>{
      console.log(this.employeeModelObj)
      this.notification.error('Error',`${err.error.message}`)
      let ref = document.getElementById("cancel")
      ref?.click()
      // alert("somethings went wrong ! ")
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      console.log(res)
      const FilteredResponse = res.filter((item:any) => !(item.contactInfo.length > 0))
      this.employeeData = res
    })
  }

  deleteEmployee(row: any){
    console.log(row)
    this.api.deleteEmployee(row.EMPLOYEE_ID)
    .subscribe(res =>{
      // console.log(res)
      this.notification.success('Suscess','Employee Added SuccessFully')
      // alert("Employee Deleted")

      this.getAllEmployee()
    }, err =>{
      this.notification.error('Error',`${err.error.message}`)
      // alert(err.error.message)
    })
  }

  onEdit(row:any){

    this.showAdd = false
    this.showUpdate = true

    this.UpdateID = row.EMPLOYEE_ID 
    this.formValue.controls['FIRST_NAME'].setValue(row.contactInfo[0].FIRST_NAME)
    this.formValue.controls['LAST_NAME'].setValue(row.contactInfo[0].LAST_NAME)
    this.formValue.controls['PHONE_NUMBER'].setValue(row.contactInfo[0].PHONE_NUMBER)
    this.formValue.controls['SALARY'].setValue(row.contactInfo[0].SALARY)
    this.formValue.controls['ADDRESS'].setValue(row.contactInfo[0].ADDRESS)
    this.formValue.controls['username'].setValue(row.username)
    // this.formValue.controls['password'].setValue(row.password)
    this.formValue.controls['BBX'].setValue(row.contactInfo[0].BBX)
    this.formValue.controls['EMAIL'].setValue(row.contactInfo[0].EMAIL)
    this.formValue.controls['HIRE_DATE'].setValue(row.contactInfo[0].HIRE_DATE)
  }

  updateEmployeeDetails(){
    this.employeeModelObj.username = this.formValue.value.username
    this.employeeModelObj.password = this.formValue.value.password
    this.employeeModelObj.contactInfo.EMAIL = this.formValue.value.EMAIL
    this.employeeModelObj.contactInfo.PHONE_NUMBER = this.formValue.value.PHONE_NUMBER
    this.employeeModelObj.contactInfo.ADDRESS = this.formValue.value.ADDRESS
    // this.employeeModelObj.AGE = this.formValue.value.age
    this.employeeModelObj.contactInfo.FIRST_NAME = this.formValue.value.FIRST_NAME
    this.employeeModelObj.contactInfo.LAST_NAME = this.formValue.value.LAST_NAME
    this.employeeModelObj.contactInfo.BBX = this.formValue.value.BBX
    this.employeeModelObj.contactInfo.SALARY = this.formValue.value.SALARY
    this.employeeModelObj.contactInfo.HIRE_DATE = this.formValue.value.HIRE_DATE


    delete this.employeeModelObj.department

    this.api.updateEmployee(this.employeeModelObj,this.UpdateID)
    .subscribe(res=>{
      console.log(res)
      this.formValue.reset()
      
      this.notification.success('Suscess','Employee updated successfully')

      // alert("Employee updated Successfully")

      let ref = document.getElementById("cancel")
      ref?.click()
      this.getAllEmployee()
    },
    err=>{
      this.notification.error('Error',`${err.error.message}`)
      console.log(this.employeeModelObj)
      let ref = document.getElementById("cancel")
      ref?.click()

      // alert(err.error.message)
    })
  }

  onView(row:any){
    this.url = `assets/${row.contactInfo[0].PICTURE}`

    this.viewEmployeeID = row.EMPLOYEE_ID
    this.viewEmployeeModelObj.username = row.username
    this.viewEmployeeModelObj.password = row.password
    this.viewEmployeeModelObj.contactInfo.EMAIL = row.contactInfo[0].EMAIL
    this.viewEmployeeModelObj.contactInfo.PHONE_NUMBER = row.contactInfo[0].PHONE_NUMBER
    this.viewEmployeeModelObj.contactInfo.ADDRESS = row.contactInfo[0].ADDRESS
    // this.employeeModelObj.AGE = this.formValue.value.age
    this.viewEmployeeModelObj.contactInfo.FIRST_NAME = row.contactInfo[0].FIRST_NAME
    this.viewEmployeeModelObj.contactInfo.LAST_NAME = row.contactInfo[0].LAST_NAME
    this.viewEmployeeModelObj.contactInfo.BBX = row.contactInfo[0].BBX
    this.viewEmployeeModelObj.contactInfo.SALARY = row.contactInfo[0].SALARY
    this.viewEmployeeModelObj.contactInfo.HIRE_DATE = row.contactInfo[0].HIRE_DATE

    // document.getElementById('viewUserName')!.innerText = row.username

    // console.log(this.viewEmployeeModelObj.username)

    // console.log(row.EMPLOYEE_ID)

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
  this.api.onFileUpload(fd,this.viewEmployeeID).subscribe(res=>{
    this.loading = true
    alert('Profile Photo updated successfully')

    this.notification.success('Suscess','Profile Photo updated successfully')

    let ref = document.getElementById("reload")
    ref?.click()
    }, err =>{
      this.notification.error('Error',`${err.error.message}`)
      alert(err.error.message)
      this.loading = false   
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

   RouteToMyProfile(){
     this.router.navigate(['/home'])
   }

   RouteToFindSuspendedUsers(){
    this.router.navigate(['/suspend'])
  }

  //  applyFilter(filterText:string){
  //   this.dataSource.filter = filterText.trim().toLowerCase()
  //  }

}
