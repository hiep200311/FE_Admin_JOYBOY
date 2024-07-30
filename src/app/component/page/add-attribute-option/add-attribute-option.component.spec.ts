import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeOptionComponent } from './add-attribute-option.component';

describe('AddAttributeOptionComponent', () => {
  let component: AddAttributeOptionComponent;
  let fixture: ComponentFixture<AddAttributeOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAttributeOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAttributeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
