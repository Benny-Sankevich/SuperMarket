import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/market-services/auth.service';

@Component({
  selector: 'app-logout',
  template: "",
})
export class LogoutComponent implements OnInit {

  public constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) { }

  //when user choose to logout
  public ngOnInit(): void {
    this.authService.logout();
    this.notificationService.success("You have been Logout.");
    this.router.navigateByUrl("/");
  }
}