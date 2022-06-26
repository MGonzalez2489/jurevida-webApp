import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGeneralInfoComponent } from './profile-general-info.component';

describe('ProfileGeneralInfoComponent', () => {
  let component: ProfileGeneralInfoComponent;
  let fixture: ComponentFixture<ProfileGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileGeneralInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
