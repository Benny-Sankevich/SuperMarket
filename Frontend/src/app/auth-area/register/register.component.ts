import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/market-services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CITIES } from '../../helpers/cities-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isLinear = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public cities = CITIES;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private notificationService: NotificationService, private router: Router,
    private title: Title) { }

  public ngOnInit(): void {
    this.title.setTitle("Sign Up");

    //build form group
    this.firstFormGroup = this.formBuilder.group({
      userId: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { asyncValidator: [async () => await this.checkIdExist(), async () => await this.checkEmailExist()] });

    this.secondFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  // function to register user
  public async register(): Promise<void> {
    try {
      const registeredUser = await this.authService.register({ ...this.firstFormGroup.value }, { ...this.secondFormGroup.value });
      this.notificationService.success("Welcome " + registeredUser.firstName + " " + registeredUser.lastName + "<br>you are now registered!");
      this.router.navigateByUrl("/");
    }
    catch (err) {
      this.notificationService.error(err);
    }
  }

  //function to check if email address exist
  public async checkEmailExist(): Promise<boolean> {
    try {
      const emailExist = await this.authService.checkEmailExistAsync(this.firstFormGroup.value.email.toLowerCase());
      //if email exist
      if (emailExist) {
        this.firstFormGroup.get('email').setErrors({ 'exist': true });
        return false;
      }
      //if email isn't exist
      return true;
    }
    catch (err) {
      this.notificationService.error(err);
      return false;
    }
  }

  //function to check if user id exist
  public async checkIdExist(): Promise<boolean> {
    try {
      const userIdExist = await this.authService.checkIdExistAsync(this.firstFormGroup.value.userId);
      //if user Id exist
      if (userIdExist) {
        this.firstFormGroup.get('userId').setErrors({ 'exist': true });
        return false;
      }
      //if user Id isn't exist
      return true;
    }
    catch (err) {
      this.notificationService.error(err);
      return false;
    }
  }
}