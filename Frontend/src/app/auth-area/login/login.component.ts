import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/market-services/auth.service';
import { CredentialsModel } from '../../models/credentials.model';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials = new CredentialsModel();

  constructor(private authService: AuthService, private notificationsService: NotificationService,
    private router: Router, private tokenExpiredService: TokenExpiredService) { }

  //function to login user
  public async login(): Promise<void> {
    try {
      this.credentials.email = this.credentials.email.toLowerCase();
      const loggedInUser = await this.authService.login(this.credentials);
      this.notificationsService.success("Hello " + loggedInUser.firstName + " " + loggedInUser.lastName);
      //if user is admin navigate to products page
      if (loggedInUser.isAdmin === "benny-admin") {
        this.router.navigateByUrl("/products");
        return;
      }
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationsService.error(err);
    }
  }
}