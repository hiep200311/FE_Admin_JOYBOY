import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigationMenuComponent } from './sidebar-navigation-menu.component';

describe('SidebarNavigationMenuComponent', () => {
  let component: SidebarNavigationMenuComponent;
  let fixture: ComponentFixture<SidebarNavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarNavigationMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
