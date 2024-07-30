import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImgCategoryComponent } from './add-img-category.component';

describe('AddImgCategoryComponent', () => {
  let component: AddImgCategoryComponent;
  let fixture: ComponentFixture<AddImgCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImgCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddImgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
