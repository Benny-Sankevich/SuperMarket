import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../../models/category.model';
import store from '../../redux/store';
import { categoriesDownloadedAction } from '../../redux/categories-state';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public constructor(private http: HttpClient) { }

  // function to get all categories
  public async getAllCategories(): Promise<CategoryModel[]> {

    if (store.getState().categoriesState.categories.length === 0) {
      const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
      store.dispatch(categoriesDownloadedAction(categories));
    }
    return store.getState().categoriesState.categories;
  }
}
