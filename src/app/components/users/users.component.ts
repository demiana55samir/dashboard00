import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../../services/usersData';
import { IUsers } from '../../models/users';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: IUsers[] = [];

  userObj: IUsers = {
    displayName:'',
    email:'',
    emailVerified:false,
    phoneNumber:'',
    userID:'',
    showButton: false,
    isAdmin:false,
  };


  constructor(private router: Router, private data: UserService) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.data.getAllUsers().subscribe(
      (users) => {
        this.users = users as IUsers[];
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  resetForm() {
    this.userObj = {
      displayName:'',
      email:'',
      emailVerified:false,
      phoneNumber:'',
      userID:'',
      showButton:false,
      isAdmin:false,
    };
  }
  showButton(user: IUsers){
    user.showButton= true;
  }
  hideButton(user: IUsers){
    user.showButton= false
  }
checkAdmin(user: IUsers){
  this.data.addDocument(user)
  this.showButton
  this.userObj.isAdmin= true
  this.data.addAdminField(user)
  console.log("from check admin");
  // if(user.showButton){
  //   user.isAdmin= true

  // } else{

  // }
}
  addUser() {
    this.data.addUser(this.userObj);
    this.resetForm();
  }

  updateUser(id: string, user: IUsers): void {
    this.userObj = { ...user };

    this.router.navigate(['/adduser', id, this.userObj]);
  }

  deleteUser(userID: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.data
        .deleteUser(userID)
        .then(() => {
          console.log('user deleted successfully');
          this.getAllUsers();
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  }

}
