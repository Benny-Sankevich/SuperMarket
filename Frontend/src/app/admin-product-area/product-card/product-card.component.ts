import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from '../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  public constructor(public dialog: MatDialog) { }

  @Input()
  public product: ProductModel;
  public imageUrl: string;

  public ngOnInit(): void {
    this.imageUrl = environment.productsUrl + "images/" + this.product.imageName;
  }

  // if user choose to change data of product 
  public openDialog(): void {
    this.dialog.open(EditProductComponent, { data: this.product });
  }
}
