import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAssociatedInfoComponent } from './profile-associated-info.component';

describe('ProfileAssociatedInfoComponent', () => {
  let component: ProfileAssociatedInfoComponent;
  let fixture: ComponentFixture<ProfileAssociatedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAssociatedInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAssociatedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
