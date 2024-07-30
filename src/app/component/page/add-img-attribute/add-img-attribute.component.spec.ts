import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImgAttributeComponent } from './add-img-attribute.component';

describe('AddImgAttributeComponent', () => {
  let component: AddImgAttributeComponent;
  let fixture: ComponentFixture<AddImgAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImgAttributeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddImgAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
