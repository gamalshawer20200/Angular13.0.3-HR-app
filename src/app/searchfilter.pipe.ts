import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeModel } from './employee-dashboard/employee-dashBoard.model';
import { searrchEmployee } from './employee-roles/searchEmployee';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Employees: searrchEmployee[], searchValue: string): searrchEmployee[] {

    if(!Employees || !searchValue){
      return Employees
    }

    if(searchValue==='[ASCE]'){
      return Employees.sort((a,b)=> {
        return ( parseInt(a.EMPLOYEE_ID) ) - ( parseInt(b.EMPLOYEE_ID) )
      })
    }

    if(searchValue==='[DESC]'){
      return Employees.sort((a,b)=> {
        return ( parseInt(b.EMPLOYEE_ID) ) - ( parseInt(a.EMPLOYEE_ID) )
      })
    }

    return Employees.filter((employee) => {
      return employee.username.toLowerCase().includes(searchValue.toLowerCase())||
      employee.role.toLowerCase().includes(searchValue.toLowerCase())||
      employee.contactInfo[0].LAST_NAME.toLowerCase().includes(searchValue.toLowerCase())||
      employee.contactInfo[0].LAST_NAME.toLowerCase().includes(searchValue.toLowerCase())||
      employee.contactInfo[0].EMAIL.toLowerCase().includes(searchValue.toLowerCase())||
      employee.contactInfo[0].PHONE_NUMBER.toString().includes(searchValue.toLowerCase())||
      employee.EMPLOYEE_ID.toString().includes(searchValue.toString())||
      employee.department?.DEPARTMENT_NAME.toLowerCase().includes(searchValue.toLowerCase())||
      employee.contactInfo[0].BBX?.toString().includes(searchValue.toLowerCase())
      
    })
  }
  
  
}

// employee.EMPLOYEE_ID.toString().charAt(0) == searchValue||
// employee.EMPLOYEE_ID.toString().charAt(0).concat(employee.EMPLOYEE_ID.toString().charAt(1)) == searchValue||
// employee.EMPLOYEE_ID == searchValue ||