import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalcService } from '../../services/global-services/calc.service';
import { Component, OnInit } from '@angular/core';
import { CITIES } from 'src/app/helpers/cities-data';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { OrderInvoiceComponent } from '../order-invoice/order-invoice.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { OrderService } from 'src/app/services/market-services/order.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public cities = CITIES;
  public order = new OrderModel();
  public user: UserModel = store.getState().authState.user;
  public creditCard: string;
  public sumOfCart: number;
  public minDate: Date;
  public maxDate: Date;
  public orderFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private calcService: CalcService, private notificationService: NotificationService,
    private orderService: OrderService, private tokenExpiredService: TokenExpiredService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.sumOfCart = this.calcService.getSumOfCart();
    //get date and set the limit of delivery date
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, this.minDate.getDate());

    this.orderFormGroup = this.formBuilder.group({
      userId: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { asyncValidator: [async () => await this.checkDeliveryDateAvailableAsync()] });
  }

  //block saturday delivery date 
  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday from being selected.
    return day !== 6;
  }

  //function to create new order
  public async addOrder(): Promise<void> {
    try {
      const date = await this.checkDeliveryDateAvailableAsync();
      if (date === false) {
        this.notificationService.error("Delivery date isn't available, please choose another date");
        return;
      }
      this.order.price = this.sumOfCart;
      const addedOrder = await this.orderService.addOrder(this.order, this.user);
      this.notificationService.success("The order has been confirmed.");
      setTimeout(() => {
        this.openDialog(addedOrder);
      }, 2500);
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  // function to check when user check delivery date if have 3 same delivery date in this date
  public async checkDeliveryDateAvailableAsync(): Promise<boolean> {
    try {
      const availableDeliveryDate = await this.orderService.checkDeliveryDateAvailableAsync(this.order.deliveryDate.toString());
      return availableDeliveryDate;
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
      return false;
    }
  }

  //show the details of the new order
  public openDialog(addedOrder: OrderModel): void {
    this.dialog.open(OrderInvoiceComponent, { data: addedOrder });
  }
}