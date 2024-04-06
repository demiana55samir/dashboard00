import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAdmins } from '../../models/iAdmins';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {

  admins: IAdmins[] =[];

  adminObj : IAdmins ={
    name :'',
    id: "",
    description:'',
  };

  name :string ='';
  id: string ="";
  description:string='';



  constructor(private router : Router ,private data :DataService) {
  }

  ngOnInit(): void {
    // this.getAllAdmins()
  }

  // getAllAdmins(){
  //   this.data.getAllAdmins.subscribe(data => {
  //     this.admins = data.map((e: any) => {
  //       const data = e.payload.doc.data();
  //       data.id = e.payload.doc.id;
  //       return data;
  //     })
  //   }, err => {
  //     alert('Error while fetching student data');
  //   })
  // }

  resetForm(){
    this.id ='';
    this.name ='';
    this.description='';
  }
  addProduct(){
    this.adminObj.id ='';
    this.adminObj.name =this.name;
    this.adminObj.description = this.description;


    this.data.addAdmin(this.adminObj);

    this.resetForm();

  }

  editProduct(){}

  deleteProduct(admin:IAdmins){
    if(window.confirm("Are you sure you want to delete this admin?")){
      this.data.deleteAdmin(admin);
    }
  }

}
