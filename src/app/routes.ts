import { Routes } from "@angular/router";
import { EmployeeDashboardComponent } from "./employee-dashboard/employee-dashboard.component";
import { LoginComponent } from "./user/login/login.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { DepartmentComponent } from "./user/department.component";
import { SuspendedEmployeesComponent } from "./suspended-employees/suspended-employees.component";
import { AuthGuard } from "./auth.guard";
import { NotfoundComponent } from "./notfound/notfound.component";
import { EmployeeRolesComponent } from "./employee-roles/employee-roles.component";

export const appRoutes : Routes =[
    {path:'', redirectTo:'/login', pathMatch:'full'},

    {
        path: 'home', 
        component: HomeComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'Dashboard', 
        component: EmployeeDashboardComponent, 
        canActivate: [AuthGuard]    
    },
    {
        path: 'employee-roles', 
        component: EmployeeRolesComponent, 
        canActivate: [AuthGuard]    
    },

    {
        path: 'suspend', 
        component: SuspendedEmployeesComponent, 
        canActivate: [AuthGuard]
    },

    {
        path: 'login',component: LoginComponent,
        children: [{path:'',component: DepartmentComponent}] 
    },

    {
        path: 'profile',component: DepartmentComponent,
        children: [{path:'',component: ProfileComponent}] 
    },

    {path: '404', component: NotfoundComponent},
    {path: '**', redirectTo: '/404'}
    
    
]