import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditingComponent } from './category-editing.component';

describe('CategoryEditingComponent', () => {
  let component: CategoryEditingComponent;
  let fixture: ComponentFixture<CategoryEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryEditingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
