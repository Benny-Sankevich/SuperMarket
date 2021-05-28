import { CartService } from 'src/app/services/market-services/cart.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from 'src/app/services/market-services/products.service';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/market-services/categories.service';
import { ItemModel } from 'src/app/models/item.model';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {

  public products: ProductModel[];
  public categories: CategoryModel[];
  public items: ItemModel[];
  public user: UserModel = store.getState().authState.user;
  public opened = true;
  public userSearch = "";

  public constructor(private categoriesService: CategoriesService, private title: Title,
    private productsService: ProductsService, private notificationService: NotificationService,
    private cartService: CartService, private tokenExpiredService: TokenExpiredService) { }

  public async ngOnInit(): Promise<void> {
    this.title.setTitle("Market");
    try {
      if (!store.getState().cartState.cart) {
        await this.cartService.addCart();
      }
      this.categories = await this.categoriesService.getAllCategories();
      this.products = await this.productsService.getAllProducts();
    }
    catch (err) {
      //if token expired
      if (err.status === 403) {
        this.tokenExpiredService.tokenSessionExpired();
      }
      this.notificationService.error(err);
    }
  }

  //get all products per category
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

  //get all products by user search
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