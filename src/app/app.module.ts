import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminAuthGuard } from './admin-auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { AdminComponent } from './component/dashboard/admin/admin.component';
import { DetailComponent } from './component/detail/detail.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';


@NgModule({
  declarations: [   
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    AdminComponent,
    DetailComponent,
    ProductListComponent,
    LoginComponent,
    RegistrationComponent

  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterModule,
    AppRoutingModule
  ],

  providers: [
    provideClientHydration(),
    provideHttpClient(),
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
