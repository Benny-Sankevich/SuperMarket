import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from 'src/app/services/market-services/products.service';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/market-services/categories.service';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: ProductModel[];
  public categories: CategoryModel[];
  public user: UserModel = store.getState().authState.user;
  public opened = false;
  public userSearch = "";

  public constructor(private categoriesService: CategoriesService, private title: Title,
    private productsService: ProductsService, private tokenExpiredService: TokenExpiredService,
    private notificationService: NotificationService) { }

  public async ngOnInit(): Promise<void> {
    this.title.setTitle("Products");
    try {
      //get all categories
      this.categories = await this.categoriesService.getAllCategories();
      this.products = await this.productsService.getAllProducts();
      this.user = store.getState().authState.user;
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  // get products when user choose to show only products of category 
  public async getProductsByCategory(categoryId: string): Promise<void> {
    try {
      this.products = await this.productsService.getAllProductsPerCategoryAsync(categoryId);
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  //get all products
  public async getAllProducts(): Promise<void> {
    try {
      this.products = await this.productsService.getAllProducts()
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  // get products by user search
  public async searchProduct(): Promise<void> {
    if (this.userSearch === "") {
      return
    }
    try {
      this.products = await this.productsService.getAllProductsBySearchAsync(this.userSearch);
      this.userSearch = "";
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