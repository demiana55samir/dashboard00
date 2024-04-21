import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAdmins } from '../../models/iAdmins';
import { AdminsService } from '../../services/admins.service';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent  {

  admins: IAdmins[] =[];

  adminObj : IAdmins ={
    name :'',
    adminId : "",
    prev:'',
    lastName:'',
  };




  constructor(private router : Router ,private data :AdminsService) {
  }

  ngOnInit(): void {
    this.getAllAdmins()
  }

  getAllAdmins():void{
    this.data.getAllAdmins().subscribe(
      (products) => {
        this.admins = products as IAdmins[];
      },
      (error) => {
        console.error('Error fetching admins:', error);
      }
    );
  }

  resetForm(){
    this.adminObj={
      name:'',
      adminId:'',
      prev:'',
      lastName:''
    }
  }
  addAdmin(){

    this.data.addAdmin(this.adminObj);

    this.resetForm();

  }

  updateAdmin(id: string, admin: IAdmins): void {
    this.adminObj = { ...admin };

    this.router.navigate(['/addadmin', id, admin]);
  }

  deleteAdmin(adminId: string): void {
    if (confirm('Are you sure you want to delete this Admin?')) {
      this.data
        .deleteAdmin(adminId)
        .then(() => {
          console.log('admin deleted successfully');
          this.getAllAdmins();
        })
        .catch((error) => {
          console.error('Error deleting admin:', error);
        });
    }
  }


}

