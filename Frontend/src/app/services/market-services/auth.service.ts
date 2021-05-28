import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../../models/credentials.model';
import { UserModel } from '../../models/user.model';
import { userLoggedInAction, userLoggedOutAction, userRegisteredInAction } from '../../redux/auth-state';
import { cartResetStateAction } from '../../redux/cart-state';
import { itemResetStateAction } from '../../redux/cartItems.state';
import store from '../../redux/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(private http: HttpClient) { }

  // register function
  public async register(loginDetails: UserModel, userInfo: UserModel): Promise<UserModel> {
    let newUser = new UserModel();
    newUser.userId = loginDetails.userId;
    newUser.email = loginDetails.email.toLowerCase();
    newUser.password = loginDetails.password;
    newUser.firstName = userInfo.firstName;
    newUser.lastName = userInfo.lastName;
    newUser.city = userInfo.city;
    newUser.street = userInfo.street;

    const registeredUser = await this.http.post<UserModel>(environment.registerUrl, newUser).toPromise();
    store.dispatch(userRegisteredInAction(registeredUser));
    return registeredUser;
  }

  // login function
  public async login(credentials: CredentialsModel): Promise<UserModel> {
    const loggedInUser = await this.http.post<UserModel>(environment.loginUrl, credentials).toPromise();
    store.dispatch(userLoggedInAction(loggedInUser));
    return loggedInUser;
  }

  // logout function
  public logout(): void {
    store.dispatch(userLoggedOutAction())
    store.dispatch(itemResetStateAction());
    store.dispatch(cartResetStateAction());
    sessionStorage.clear();
  }

  // function to check if email address exist
  public async checkEmailExistAsync(email: string): Promise<boolean> {
    const existEmail = await this.http.post<boolean | object>(environment.checkEmailUrl, { email }).toPromise();
    //if email exist
    if (existEmail) return true;
    //if email isn't exist
    return false;
  }

  // function to check if user id exist
  public async checkIdExistAsync(userId: string): Promise<boolean> {
    const existUserId = await this.http.post<boolean | object>(environment.checkIdUrl, { userId }).toPromise();
    //if user id exist
    if (existUserId) return true;
    //if user id isn't exist
    return false;
  }
}