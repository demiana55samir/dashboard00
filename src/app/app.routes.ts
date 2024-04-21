import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddproductComponent } from './components/product/addproduct.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { UsersComponent } from './components/users/users.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminsComponent } from './components/admins/admins.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { EditOrdersComponent } from './components/edit-orders/edit-orders.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryEditingComponent } from './components/category-editing/category-editing.component';
import { guardAuthGuard } from './services/guard-auth.guard';
// import { EditCatComponent } from './components/edit-cat/edit-cat.component';



export const routes: Routes = [
  {path:"", redirectTo:"login" , pathMatch:"full"},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate:[guardAuthGuard],
    children: [

      {path:"", redirectTo:"home" , pathMatch:"full"},
      { path: 'home', component: HomeComponent },

      { path: 'addproduct', component: AddproductComponent },
      { path: 'edit-product/:id ', component: EditProductComponent },

      { path: 'categories', component: CategoriesComponent },
      { path: 'edit-cat/:id', component: CategoryEditingComponent },

      {path:'admins', component:AdminsComponent},
      { path: 'addadmin/:id', component: AddAdminComponent },

      { path: 'users', component: UsersComponent},
      {path:'adduser/:id' , component:AddUsersComponent},

      { path: 'orders', component: OrdersComponent },
      {path:'editOrder/:id',component: EditOrdersComponent},
      
      { path: 'logout', component: LogoutComponent },

    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];


