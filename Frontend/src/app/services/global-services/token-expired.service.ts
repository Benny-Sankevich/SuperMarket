import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../market-services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenExpiredService {

    public constructor(private router: Router, private authService: AuthService) { }

    //if token expired
    public tokenSessionExpired() {
        this.authService.logout();
        this.router.navigateByUrl("/");
    }
}