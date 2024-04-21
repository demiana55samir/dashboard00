import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAdmins } from '../../models/iAdmins';
import { AdminsService } from '../../services/admins.service';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {

  admin: IAdmins = {
    name :'',
    adminId : "",
    prev:'',
    lastName:'',
  };

  params: any;
  adminId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: AdminsService
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.adminId = this.params.id;
    this.getAdmin(this.params.id);
  }

  getAdmin(adminId: string): void {
    this.data.getAdmin(adminId).subscribe(
      (admin) => {
        this.admin = admin as IAdmins;
      },
      (error) => {
        console.error('Error fetching admin:', error);
      }
    );
  }

  updateAdmin(): void {
    this.data
      .updateAdmin(this.adminId as string, this.admin)
      .then(() => {
        console.log('admin updated successfully');
        this.router.navigate(['/admins']);
      })
      .catch((error) => {
        console.error('Error updating admin:', error);
      });
  }

}
