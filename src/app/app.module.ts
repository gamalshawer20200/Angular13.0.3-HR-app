import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DepartmentComponent } from './user/department.component';
import { SuspendedEmployeesComponent } from './suspended-employees/suspended-employees.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTableDataSource, MatTableModule} from '@angular/material/table'
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import {MatInputModule} from'@angular/material/input'
@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    DepartmentComponent,
    SuspendedEmployeesComponent,
    NotfoundComponent,
    EmployeeRolesComponent,
    SearchfilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SimpleNotificationsModule.forRoot({
      timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true,    
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    LoginComponent,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
