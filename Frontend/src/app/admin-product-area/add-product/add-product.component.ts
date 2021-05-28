import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/market-services/products.service';
import { CategoriesService } from 'src/app/services/market-services/categories.service';
import { NotificationService } from 'src/app/services/global-services/notifications.service';
import { TokenExpiredService } from 'src/app/services/global-services/token-expired.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public product = new ProductModel();
    public categories: CategoryModel[];
    public preview: string; // Image preview

    public constructor(private notificationService: NotificationService, private productsService: ProductsService,
        private categoriesService: CategoriesService, private tokenExpiredService: TokenExpiredService) { }

    public async ngOnInit(): Promise<void> {
        try {
            //get all categories
            this.categories = await this.categoriesService.getAllCategories();
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
            this.product.image = (image.target as HTMLInputElement).files[0];
            // Read the image into preview variable:
            const fileReader = new FileReader(); // JavaScript object which can read files from the user computer
            fileReader.onload = args => this.preview = args.target.result.toString(); // When complete reading - set the image into the preview variable
            fileReader.readAsDataURL(this.product.image); // Start reading.
        }
    }

    //function to add product
    public async addProduct(): Promise<void> {
        try {
            if (this.product.price < 1) {
                this.notificationService.error("The price must be a positive number");
                return;
            }
            await this.productsService.addProduct(this.product);
            this.resetImage();
            this.notificationService.success("Product has been added");
        }
        catch (err) {
            //if token expired
            if (err.status === 403) {
                this.tokenExpiredService.tokenSessionExpired();
            }
            this.notificationService.error(err);
            this.resetImage();
        }
    }

    //function to reset image on form
    public resetImage(): void {
        this.preview = null;
        this.product.image = null;
    }

    //function break if user don't choose product image
    public checkImage(): void {
        if (!this.product.image) {
            this.notificationService.error("Missing image.");
        }
    }
}