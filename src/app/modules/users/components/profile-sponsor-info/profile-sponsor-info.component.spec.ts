import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSponsorInfoComponent } from './profile-sponsor-info.component';

describe('ProfileSponsorInfoComponent', () => {
  let component: ProfileSponsorInfoComponent;
  let fixture: ComponentFixture<ProfileSponsorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSponsorInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSponsorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
