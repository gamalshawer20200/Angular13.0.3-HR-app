import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any){
    return this.http.post<any>("http://localhost:4000/employees/create",data,{})
    .pipe(map(res=>{
      return res
    }))
  }

  getEmployee(){
    return this.http.get<any>("http://localhost:4000/employees",{withCredentials:true})
  }

  getSuspendedEmployees(){
    return this.http.get<any>("http://localhost:4000/employees/suspend")
  }

  getEmployeeById(id:string){
    return this.http.get<any>("http://localhost:4000/employees/"+id)
  }

  updateEmployee(data: any, id:number){
    console.log('ID of the ROW ----------->'+id)
    return this.http.put<any>("http://localhost:4000/employees/"+id,data)
  }

  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:4000/employees/"+id)
  }

  login(data: any){
    return this.http.post<any>("http://localhost:4000/employees/login",data,{})
    .pipe(map(res=>{
      console.log('***-----*****-----**************'+res)
      return res
    }))
  }

  updateEmployeeById(id:number,data:any){
    console.log(data)
  }

  updateEmployeeRole(id:number, data:any){
    console.log(data)
    return this.http.post("http://localhost:4000/employees/updateRole/"+id,data) 
  }

  getImageByEmployeeId(id:number){
    return this.http.get<any>("http://localhost:4000/employees/image/"+id)
  }

  onFileUpload(fd:any,id:number){
    return this.http.post('http://localhost:4000/employees/uploadImage/'+id,fd)
  }

  getDepartments(){
    return this.http.get<any>("http://localhost:4000/departments")
  }

  updateDepartment(data:any){
    return this.http.post<any>("http://localhost:4000/departments/updateUserDepratment",data,{})
  }
  updateDetailsOfDepartment(id:any,data:any){
    return this.http.put<any>("http://localhost:4000/departments/"+id,data)
  }

  addDepartment(data:any){
    console.log('dataaaaaaaaaaaaaaaaaaa***' , data)
    return this.http.post('http://localhost:4000/departments/create',data)
  }

  onDepartmentSuspend(data:any){
    return this.http.post<any>('http://localhost:4000/departments/delete',data)
  }
}
