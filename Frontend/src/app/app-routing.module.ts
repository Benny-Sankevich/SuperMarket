import { ProductListComponent } from './admin-product-area/product-list/product-list.component';
import { LogoutComponent } from './auth-area/logout/logout.component';
import { HomeComponent } from './home-area/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './layout-area/page404/page404.component';
import { LoginGuard } from './services/guard-services/login.guard';
import { RegisterComponent } from './auth-area/register/register.component';
import { MarketListComponent } from './market-area/market-list/market-list.component';
import { OrderComponent } from './order-area/order/order.component';
import { AdminGuard } from './services/guard-services/admin.guard';
import { CartGuard } from './services/guard-services/cart.guard';

const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "logout", component: LogoutComponent },
    { path: "register", component: RegisterComponent },
    { path: "products", canActivate: [AdminGuard], component: ProductListComponent },
    { path: "market", canActivate: [LoginGuard], component: MarketListComponent },
    { path: "order", canActivate: [LoginGuard, CartGuard], component: OrderComponent },
    { path: "**", component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
