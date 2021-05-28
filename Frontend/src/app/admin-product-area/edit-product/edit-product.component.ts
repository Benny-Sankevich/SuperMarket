import { environment } from '../../../environments/environment';
import { ProductModel } from '../../models/product.model';
import { Component, Inject, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/market-services/products.service';
import { CategoryModel } from '../../models/category.model';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { CategoriesService } from 'src/app/services/market-services/categories.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public categories: CategoryModel[];
  public preview: string; // Image preview
  public newProduct: FormGroup;

  public constructor(private formBuilder: FormBuilder, private notificationService: NotificationService, private productsService: ProductsService,
    private categoriesService: CategoriesService, private tokenExpiredService: TokenExpiredService,
    @Inject(MAT_DIALOG_DATA) public product: ProductModel, public dialog: MatDialog) { }

  public async ngOnInit(): Promise<void> {
    try {
      //get all categories
      this.categories = await this.categoriesService.getAllCategories();
      this.preview = environment.productsUrl + "images/" + this.product.imageName;

      //input old product data to form
      this.newProduct = this.formBuilder.group({
        _id: [this.product._id, Validators.required],
        name: [this.product.name, Validators.required],
        price: [this.product.price, Validators.required],
        categoryId: [this.product.categoryId, Validators.required],
        image: [''],
        imageName: [this.product.imageName, Validators.required],
      });
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  // function to handle image change and show 
  public handleImage(image: Event): void {
    if ((image.target as HTMLInputElement).files[0]) {
      this.newProduct.patchValue({ image: (image.target as HTMLInputElement).files[0] });
      // Read the image into preview variable:
      const fileReader = new FileReader(); // JavaScript object which can read files from the user computer
      fileReader.onload = args => this.preview = args.target.result.toString(); // When complete reading - set the image into the preview variable
      fileReader.readAsDataURL((image.target as HTMLInputElement).files[0]); // Start reading.
    }
  }

  //function to update product data
  public async updateProduct(): Promise<void> {
    try {
      if (this.newProduct.value.price < 1) {
        this.notificationService.error("The price must be a positive number");
        return;
      }
      this.dialog.closeAll();
      await this.productsService.updateProduct(this.newProduct.value);
      this.notificationService.success("Product has been updated");
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }
}
