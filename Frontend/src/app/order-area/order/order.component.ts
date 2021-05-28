import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  public opened = true;
  public constructor(private title: Title) { }
  public ngOnInit(): void {
    this.title.setTitle("Order");
  }
}
