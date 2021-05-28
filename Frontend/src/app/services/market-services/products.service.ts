import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../../models/product.model';
import { productAddedAction, productDownloadedAction, productUpdatedAction } from '../../redux/products-state';
import store from '../../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public constructor(private http: HttpClient) { }

  // function to get all products
  public async getAllProducts(): Promise<ProductModel[]> {
    const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
    store.dispatch(productDownloadedAction(products));
    return store.getState().productsState.products;
  }

  // function to get all products per category
  public async getAllProductsPerCategoryAsync(categoryId: string): Promise<ProductModel[]> {
    const products = await this.http.get<ProductModel[]>(environment.productsUrl + "categories/" + categoryId).toPromise();
    store.dispatch(productDownloadedAction(products));
    return store.getState().productsState.products;
  }

  // function to get all products by user search
  public async getAllProductsBySearchAsync(search: string): Promise<ProductModel[]> {
    const products = await this.http.get<ProductModel[]>(environment.productsUrl + "search/" + search).toPromise();
    store.dispatch(productDownloadedAction(products));
    return store.getState().productsState.products;
  }

  // function to get sum of products in website
  public async getTotalProductsAsync(): Promise<number> {
    const totalProducts = await this.http.get<number>(environment.productsUrl + "total-products").toPromise();
    return totalProducts;
  }

  // function to create new product
  public async addProduct(product: ProductModel): Promise<ProductModel> {

    const myFormData = new FormData();
    myFormData.append("name", product.name);
    myFormData.append("categoryId", product.categoryId);
    myFormData.append("price", product.price.toString());
    myFormData.append("image", product.image);

    const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
    store.dispatch(productAddedAction(addedProduct));
    return addedProduct;
  }

  // function to update product data
  public async updateProduct(product: ProductModel): Promise<ProductModel> {

    const myFormData = new FormData();
    myFormData.append("name", product.name);
    myFormData.append("categoryId", product.categoryId);
    myFormData.append("price", product.price.toString());
    myFormData.append("imageName", product.imageName);
    myFormData.append("image", product.image);

    const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product._id, myFormData).toPromise();
    store.dispatch(productUpdatedAction(updatedProduct));
    return updatedProduct;
  }
}
