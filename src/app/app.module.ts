import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {CanActivateFn, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import { NavbarComponent } from './navbar/navbar.component';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "./services/category.service";
import {OrderService} from "./services/order.service";
import {ProductService} from "./services/product.service";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {UserService} from "./services/user.service";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { HomeComponent } from './home/home.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ViewOrderComponent } from './dialog/view-order/view-order.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {JsonPipe, NgIf} from "@angular/common";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./services/auth-guard.service";
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductsComponent,
    OrderSuccessComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    HomeComponent,
    AdminProductsComponent,
    ProductFormComponent,
    AdminOrdersComponent,
    ProductFilterComponent,
    MyOrderComponent,
    ViewOrderComponent,
    RegisterComponent,
    OtpComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot([
            {path: '', component: ProductsComponent, canActivate: [AuthGuard]},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
            {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
            {path: 'order-success/:id', component: OrderSuccessComponent},
            {path: 'my-order', component: MyOrderComponent},
            {path: 'admin/product/new', component: ProductFormComponent, canActivate: [AuthGuard]},
            {path: 'admin/product/:id', component: ProductFormComponent, canActivate: [AuthGuard]},
            {path: 'admin/product', component: AdminProductsComponent, canActivate: [AuthGuard]},
            {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard]},
        ]),
        HttpClientModule,
        FormsModule,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        NgIf,
        JsonPipe,
        MatNativeDateModule,
        BrowserAnimationsModule,
        FlexModule
    ],
  providers: [AuthService, CategoryService, OrderService, ProductService, ShoppingCartService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
