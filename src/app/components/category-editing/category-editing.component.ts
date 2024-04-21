import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Iproduct } from '../../models/iproducts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../models/icategory';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-editing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-editing.component.html',
  styleUrl: './category-editing.component.css'
})

 
export class CategoryEditingComponent implements OnInit {
  
  category : Icategory = {
    catId:'',
    Subcategories:{
        subcatId:'',
        id:'',
        name:'',
    },
    description:'',
    name:'',
    url:''
  };

  params: any;
  catId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: CategoriesService
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.catId = this.params.catId;
    this.getCategory(this.params.catId);
  }

  getCategory(catId: string): void {
    this.data.getCategory(catId).subscribe(
      (cat) => {
        this.category = cat as Icategory;
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }

  updateCat(): void {
    this.data
      .updateCat(this.catId as string, this.category)
      .then(() => {
        console.log('Category updated successfully');
        this.router.navigate(['/categories']);
      })
      .catch((error) => {
        console.error('Error updating category:', error);
      });
  }
}
