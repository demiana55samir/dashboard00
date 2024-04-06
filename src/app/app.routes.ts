import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SettingComponent } from './components/setting/setting.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';



export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {path:"", redirectTo:"home" , pathMatch:"full"},
      { path: 'home', component: HomeComponent },

      { path: 'addproduct', component: AddproductComponent },
      { path: 'addadmin', component: AddAdminComponent },
      { path: 'edit-product/:product ', component: EditProductComponent },

      { path: 'setting', component: SettingComponent },
      { path: 'logout', component: LogoutComponent },


     
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];


