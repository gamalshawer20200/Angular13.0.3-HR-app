import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
// declare var name: any;

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(
    private router: Router,
    private notification: NotificationsService
  ) { }

  ngOnInit(): void {
    // new name();
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
