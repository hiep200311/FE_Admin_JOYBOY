import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/page/login/login.component';
import { BrandService } from './service/brand/brand.service';
import { CatagoryService } from './service/catagory/catagory.service';
import { AddAttributesComponent } from './component/page/add-attributes/add-attributes.component';
import { AddProductComponent } from './component/page/add-product/add-product.component';
import { ListProductComponent } from './component/page/list-product/list-product.component';
import { SidebarNavigationMenuComponent } from './component/page/sidebar-navigation-menu/sidebar-navigation-menu.component';
import { AddBrandComponent } from './component/page/add-brand/add-brand.component';
import { AddCatagoryComponent } from './component/page/add-catagory/add-catagory.component';
import { ListUserComponent } from './component/page/list-user/list-user.component';
import { AddAttributeOptionComponent } from './component/page/add-attribute-option/add-attribute-option.component';
import { ProductAttributeComponent } from './component/page/product-attribute/product-attribute.component';
import { AddImgAttributeComponent } from './component/page/add-img-attribute/add-img-attribute.component';
import { AddImgCategoryComponent } from './component/page/add-img-category/add-img-category.component';




const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'add-brand',
    component: AddBrandComponent
  },

  {
    path: 'add-catagory',
    component: AddCatagoryComponent
  },

  {
    path: 'add-attribute',
    component: AddAttributesComponent
  },

  {
    path: 'add-product',
    component: AddProductComponent
  },

  {
    path: 'list-product',
    component: ListProductComponent
  },

  {
    path: 'sidebar-menu',
    component:SidebarNavigationMenuComponent
  },

  {
    path: 'list-user',
    component: ListUserComponent
  },

  {
    path: 'add-attribute-option',
    component: AddAttributeOptionComponent
  },

  {
    path: 'product-attribute',
    component: ProductAttributeComponent
  },
  {
    path: 'img-attribute',
    component: AddImgAttributeComponent
  },

  {
    path: 'img-category',
    component: AddImgCategoryComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
