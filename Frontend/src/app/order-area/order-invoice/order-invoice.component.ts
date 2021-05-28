import { Router } from '@angular/router';
import { OrderModel } from 'src/app/models/order.model';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from "file-saver";
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/global-services/notifications.service';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.css']
})
export class OrderInvoiceComponent {

  public constructor(@Inject(MAT_DIALOG_DATA) public orderAdded: OrderModel, public dialog: MatDialog,
    private router: Router, private notificationService: NotificationService) { }

  // download invoice
  public downloadInvoice(): void {
    try {
      const pdfUrl = environment.ordersUrl + `invoices/${this.orderAdded._id}.pdf`;
      const pdfName = `${this.orderAdded.invoiceNumber}`;
      saveAs(pdfUrl, pdfName);
    }
    catch (err) {
      this.notificationService.error(err)
    }
  }

  // show invoice
  public showInvoice(): void {
    try {
      const pdfUrl = environment.ordersUrl + `invoices/${this.orderAdded._id}.pdf`;
      window.open(pdfUrl + '#page=' + 1, '_blank', '');
    }
    catch (err) {
      this.notificationService.error(err)
    }
  }

  // close the dialog window and navigate to home page
  public closeDialog(): void {
    this.dialog.closeAll();
    this.router.navigateByUrl("/");
  }
}