import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from '../../models/users';
import { UserService } from '../../services/usersData';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css'
})
export class AddUsersComponent {

  user: IUsers = {
    displayName:'',
    email:'',
    emailVerified:false,
    phoneNumber:'',
    userID:'',
    showButton:false,
    isAdmin:false,
  };

  params: any;
  productId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: UserService
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.productId = this.params.id;
    this.getUser(this.params.id);
  }

  getUser(id: string): void {
    this.data.getUser(id).subscribe(
      (user) => {
        this.user = user as IUsers;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateUser(): void {
    this.data.updateUser(this.user.userID as string, this.user)
      .then(() => {
        console.log('user updated successfully');
        this.router.navigate(['/users']);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }
}
