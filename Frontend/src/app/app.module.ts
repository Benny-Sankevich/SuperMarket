import { ProductCardComponent } from './admin-product-area/product-card/product-card.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout-area/layout/layout.component';
import { HeaderComponent } from './layout-area/header/header.component';
import { HomeComponent } from './home-area/home/home.component';
import { Page404Component } from './layout-area/page404/page404.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AddProductComponent } from './admin-product-area/add-product/add-product.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LoginComponent } from './auth-area/login/login.component';
import { LogoutComponent } from './auth-area/logout/logout.component';
import { RegisterComponent } from './auth-area/register/register.component';
import { AuthMenuComponent } from './layout-area/menu/menu.component';
import { JwtInterceptor } from './services/global-services/jwt.interceptor';
import { InfoComponent } from './home-area/info/info.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AboutComponent } from './home-area/about/about.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProductComponent } from './admin-product-area/edit-product/edit-product.component';
import { ProductListComponent } from './admin-product-area/product-list/product-list.component';
import { OrderComponent } from './order-area/order/order.component';
import { MarketListComponent } from './market-area/market-list/market-list.component';
import { MarketCardComponent } from './market-area/market-card/market-card.component';
import { CartListComponent } from './cart-area/cart-list/cart-list.component';
import { CartCardComponent } from './cart-area/cart-card/cart-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OrderInvoiceComponent } from './order-area/order-invoice/order-invoice.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CartEditAmountComponent } from './cart-area/cart-edit-amount/cart-edit-amount.component';
import { OrderFormComponent } from './order-area/order-form/order-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientButtonComponent } from './home-area/client-button/client-button.component';
import { AdminButtonComponent } from './home-area/admin-button/admin-button.component';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        HomeComponent,
        Page404Component,
        AddProductComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        AuthMenuComponent,
        InfoComponent,
        AboutComponent,
        EditProductComponent,
        ProductListComponent,
        ProductCardComponent,
        OrderComponent,
        MarketListComponent,
        MarketCardComponent,
        CartListComponent,
        CartCardComponent,
        OrderInvoiceComponent,
        CartEditAmountComponent,
        OrderFormComponent,
        ClientButtonComponent,
        AdminButtonComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatStepperModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatDatepickerModule,
        MatTabsModule,
        MatNativeDateModule
    ],
    exports: [],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true,
    }],
    bootstrap: [LayoutComponent]
})
export class AppModule { }
