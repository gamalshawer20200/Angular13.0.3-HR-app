import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from '../employee-dashboard/employee-dashBoard.model';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-suspended-employees',
  templateUrl: './suspended-employees.component.html',
  styleUrls: ['./suspended-employees.component.css']
})
export class SuspendedEmployeesComponent implements OnInit {

  employeeData !: any
  url : any = ""
  viewEmployeeModelObj : EmployeeModel = new EmployeeModel()
  viewEmployeeID !: any

  constructor(
    private router: Router,
    private api : ApiService
  ) { }

  ngOnInit(): void {

    this.getAllEmployee()
  }


  getAllEmployee(){
    
    this.api.getSuspendedEmployees()
    .subscribe(res=>{
      this.employeeData = res
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

}
