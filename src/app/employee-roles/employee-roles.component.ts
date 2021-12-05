import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../api/api.service';
import { Role } from './employee-roles.enum';
import { searrchEmployee } from './searchEmployee';

@Component({
  selector: 'app-employee-roles',
  templateUrl: './employee-roles.component.html',
  styleUrls: ['./employee-roles.component.css']
})
export class EmployeeRolesComponent implements OnInit {
  employeeData !:searrchEmployee[]
  roles :any = Role
  roleKeys !: any
  formValue !:any

  searchValue!:string

  constructor(private router: Router, private api: ApiService, private notifiacion: NotificationsService) { }

  ngOnInit(): void {
    // console.log(this.roles)
    this.getAllEmployee()
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      // console.log(res)
      // const FilteredResponse = res.filter((item:any) => !(item.contactInfo.length > 0))
      console.log(this.roles);
      console.log(res)
      this.roleKeys = Object.keys(this.roles)
      console.log(this.roleKeys);
      
      this.employeeData = res
    })
  }

  updateRole(userId:any){
    const selectedRole:any = document.getElementById(userId)
    const valueOfSelectedRole = selectedRole!.value
    // console.log(valueOfSelectedRole)
    // console.log(userId);
    this.api.updateEmployeeRole(userId,{role: valueOfSelectedRole})
    .subscribe((res:any) => { 
      console.log(res)
      this.notifiacion.success('Success','Role Updated Succesfully')
      this.getAllEmployee()
    },err=>{
      this.notifiacion.error('Error', err.error.message)
      // alert('you are not allowed to Change Roles !') 
    })
    
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
