import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from '../employee-dashboard/employee-dashBoard.model';
import { ApiService } from '../api/api.service';
import { DepartmentModel, updatedDetailsDepartmentModel } from './department.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentsEnum } from './departments.enum';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {


  departmentModelObject !: any 
  employeeModelObject!:any
  viewEmployeeID !: any
  viewEmployeeModelObj : EmployeeModel = new EmployeeModel()
  url : any = ""
  EmployeeWithContactInfo !: any
  x! : any
  value !: any
  dateTime!: any

  formValue !: FormGroup
  updatedDetailsDepartmentId !: any
  updatedDetailsDepartmentModel : updatedDetailsDepartmentModel = new updatedDetailsDepartmentModel()
  departmentEnum: any = DepartmentsEnum
  departmentsEnumKeys !: any
  previousLocation :string = ''

  showAdd !: boolean
  showUpdate !: boolean
  // AddDepartmentform !: FormGroup




  constructor(    
    private api: ApiService,
    private router: Router,
    private formbuilder: FormBuilder,
    private notifiaction:NotificationsService,
    ) { }

    clickAddEmployee(){
      this.formValue.reset()

      var locationValue:any = document.getElementById('select')
      locationValue!.value = ""

      this.showAdd = true
      this.showUpdate = false
    }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      DEPARTMENT_NAME: [''],
      LOCATION: [''],      
    })

    this.getAllDepartments()

    const today= new Date()
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    this.dateTime = formattedDate

    this.departmentsEnumKeys= Object.keys(this.departmentEnum)

  }

  getAllDepartments(){
     let xc :any = []
     let p :any = []
    this.api.getDepartments()
    .subscribe(res=>{
      console.log(res)
      console.log('*********************'+res[0].employee)
      this.departmentModelObject = res
      res.map((item:any)=>{
        console.log(item.employee);
        xc.push(item.employee)        
      }) 
      // this.employeeModelObject = res.employee
      // this.x = xc
      // console.log(this.x)
      
      xc.forEach((element:any) => {
        element.forEach((item:any) => {
          // console.log(item)
          p.push(item)
        });
      });
      // p.sort((a: any,b: any)=> {
      //   return ( parseInt(a.EMPLOYEE_ID) ) - ( parseInt(b.EMPLOYEE_ID) )
      // })
      this.x = p

      console.log(this.x)
      
    })
  }
  
  
  onView(item:any){
    this.api.getEmployeeById(item.EMPLOYEE_ID).subscribe((res:any)=>{
      // console.log(res)
      // this.EmployeeWithContactInfo = res
      this.url = `assets/${res.contactInfo[0].PICTURE}`
      this.viewEmployeeID = res.EMPLOYEE_ID
      this.viewEmployeeModelObj.username = res.username
      this.viewEmployeeModelObj.password = res.password
      this.viewEmployeeModelObj.contactInfo.EMAIL = res.contactInfo[0].EMAIL
      this.viewEmployeeModelObj.contactInfo.PHONE_NUMBER = res.contactInfo[0].PHONE_NUMBER
      this.viewEmployeeModelObj.contactInfo.ADDRESS = res.contactInfo[0].ADDRESS
      // this.employeeModelObj.AGE = this.formValue.value.age
      this.viewEmployeeModelObj.contactInfo.FIRST_NAME = res.contactInfo[0].FIRST_NAME
      this.viewEmployeeModelObj.contactInfo.LAST_NAME = res.contactInfo[0].LAST_NAME
      this.viewEmployeeModelObj.contactInfo.BBX = res.contactInfo[0].BBX
      
      if(localStorage.getItem("role") === 'hr' || localStorage.getItem("role") === 'admin' ){
        this.viewEmployeeModelObj.contactInfo.SALARY = res.contactInfo[0].SALARY
      }
      
      this.viewEmployeeModelObj.contactInfo.HIRE_DATE = res.contactInfo[0].HIRE_DATE
    })
    
    
    // document.getElementById('viewUserName')!.innerText = row.username
    
    // console.log(this.viewEmployeeModelObj.username)
    
    // console.log(row.EMPLOYEE_ID)
    
  }
  
  deleteEmployee(row: any){
    console.log(row)
    this.api.deleteEmployee(row.EMPLOYEE_ID)
    .subscribe(res =>{
      // console.log(res)
      // alert("Employee Deleted")
      this.notifiaction.success('Success','Employee Deleted Successfully')
      // window.location.reload();
    this.getAllDepartments()
      
    }, err=>{
      this.notifiaction.error('Error',err.error.message)
      // alert(err.error.message)
    })
  }
  

  toggleSubmitDisable(id:any){
    console.log(id)
   document.getElementById(id)?.removeAttribute("disabled")
    
  }


  AddEmployeeToDepartment(departmentId:any){
    var e:any = document.getElementById(departmentId);    
    var value = e!.value
    
    var vStr = value.split(',');
    var employeeId = vStr[0]
    var departmentId = vStr[1]
    var data = {employeeId,departmentId}
    console.log(data)
    this.api.updateDepartment(data).subscribe((res:any)=>{
      console.log(res)
      // window.location.reload()             //----------------------------------------------------------------------------------------------------------------//
      this.notifiaction.info('Updated','Department Updated successfully')
      this.getAllDepartments()
    },err=>{
      this.notifiaction.error('Error', err.error.message)
      // alert(err.error.message)
    })
    
  }

  updateDepartmentDetails(){
    this.updatedDetailsDepartmentModel.DEPARTMENT_NAME = this.formValue.value.DEPARTMENT_NAME
    const selectedLocation:any = document.getElementById('select')
    const valueOfSelectedLocation = selectedLocation!.value
    this.updatedDetailsDepartmentModel.LOCATION = valueOfSelectedLocation
    // this.updatedDetailsDepartmentModel.LOCATION = this.formValue.value.LOCATION

    // console.log(this.updatedDetailsDepartmentModel)
    this.api.updateDetailsOfDepartment(this.updatedDetailsDepartmentId, this.updatedDetailsDepartmentModel).subscribe(res => {
      // alert('updated Susccessfully ')
      // window.location.reload()
      this.notifiaction.info('Updated','Department Updated successfully')
      this.getAllDepartments()
      document.getElementById('cancel')?.click()
    }, err =>{
      // alert(err.error.message)
      this.notifiaction.error('Error', err.error.message)
    })
  }

  onDepartmentEdit(row:any){
    this.showAdd = false
    this.showUpdate = true

    var locationValue:any = document.getElementById('select')
    locationValue!.value = ""

    this.formValue.controls['DEPARTMENT_NAME'].setValue(row.DEPARTMENT_NAME)
    // this.formValue.controls['LOCATION'].setValue(row.LOCATION)
    this.previousLocation = row.LOCATION
    this.updatedDetailsDepartmentId = row.DEPARTMENT_ID
  }

  onDepartmentSuspend(row:any){
    // console.log(row)
    this.api.onDepartmentSuspend(row).subscribe(res=>{
      // console.log(res)
      alert('Department Suspended Successfully !')
      window.location.reload()
      // this.notifiaction.success('Success','Department Suspended successfully')

      this.getAllDepartments()
    }, err => {
      // alert(err.error.message)
      console.log(err)
      window.location.reload()
      // this.notifiaction.error('Error', err.error.message)
    })
  }

  addDepartment(){
    this.updatedDetailsDepartmentModel.DEPARTMENT_NAME = this.formValue.value.DEPARTMENT_NAME
    const selectedLocation:any = document.getElementById('select')
    const valueOfSelectedLocation = selectedLocation!.value
    this.updatedDetailsDepartmentModel.LOCATION = valueOfSelectedLocation
    // console.log(this.updatedDetailsDepartmentModel);
    this.api.addDepartment(this.updatedDetailsDepartmentModel).subscribe(res=>{
      // alert('new Department has been Added successfully !')
      // console.log(res)
      // window.location.reload()
      this.notifiaction.success('Success','New Department has beed Added successfully')
      this.getAllDepartments()
      document.getElementById('cancel')?.click()
    }, err =>{
      // alert(err.error.message)
      this.notifiaction.error('Error', err.error.message)
    })
    
  }
  

  ASCE(employees :any){
    employees.sort((a: any,b: any)=> {
      return ( parseInt(a.EMPLOYEE_ID) ) - ( parseInt(b.EMPLOYEE_ID) )
    })
  }
  DESC(employees: any){
    employees.sort((a: any,b: any)=> {
      return ( parseInt(b.EMPLOYEE_ID) ) - ( parseInt(a.EMPLOYEE_ID) )
    })
  }

  
  RouteToFindSuspendedUsers(){
    this.router.navigate(['/suspend'])
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
  
  
  

}
