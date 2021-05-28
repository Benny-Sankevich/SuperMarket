import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
// menu buttons
export class AuthMenuComponent implements OnInit {

  public user: UserModel = store.getState().authState.user;
  public unsubscribeStore: Unsubscribe;

  public ngOnInit(): void {
    this.unsubscribeStore = store.subscribe(() => {
      this.user = store.getState().authState.user;
    })
  }

  public ngOnDestroy(): void {
    this.unsubscribeStore();
  }
}