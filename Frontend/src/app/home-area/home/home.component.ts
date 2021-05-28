import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
// home page
export class HomeComponent implements OnInit {

    public user: UserModel = store.getState().authState.user;
    public cart: CartModel = store.getState().cartState.cart;
    public unsubscribeStore: Unsubscribe;

    public constructor(private title: Title) { }

    public ngOnInit(): void {
        this.title.setTitle("Home");
        this.unsubscribeStore = store.subscribe(() => {
            this.user = store.getState().authState.user;
        })
    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }
}
