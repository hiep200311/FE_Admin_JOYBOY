import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import {NgOptimizedImage} from "@angular/common";
import { LoginComponent } from './component/page/login/login.component';
import { SidebarNavigationMenuComponent } from './component/page/sidebar-navigation-menu/sidebar-navigation-menu.component';
import { AddCatagoryComponent } from './component/page/add-catagory/add-catagory.component';
import { AddBrandComponent } from './component/page/add-brand/add-brand.component';
import { AddProductComponent } from './component/page/add-product/add-product.component';
import { AddAttributesComponent } from './component/page/add-attributes/add-attributes.component';
import { ListProductComponent } from './component/page/list-product/list-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListUserComponent } from './component/page/list-user/list-user.component';
import { AddAttributeOptionComponent } from './component/page/add-attribute-option/add-attribute-option.component';
import { ProductAttributeComponent } from './component/page/product-attribute/product-attribute.component';
import { AddImgAttributeComponent } from './component/page/add-img-attribute/add-img-attribute.component';
import { AddImgCategoryComponent } from './component/page/add-img-category/add-img-category.component';

@NgModule({
   declarations: [
    AppComponent,
      LoginComponent,
      SidebarNavigationMenuComponent,
      AddCatagoryComponent,
      AddBrandComponent,
      AddProductComponent,
      AddAttributesComponent,
      ListProductComponent,
      ListUserComponent,
      AddAttributeOptionComponent,
      ProductAttributeComponent,
      AddImgAttributeComponent,
      AddImgCategoryComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IonicModule.forRoot({}),
        NgOptimizedImage,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        IonicModule.forRoot({}),
        NgOptimizedImage,
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
