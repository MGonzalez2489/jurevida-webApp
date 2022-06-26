import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCouncilInfoComponent } from './profile-council-info.component';

describe('ProfileCouncilInfoComponent', () => {
  let component: ProfileCouncilInfoComponent;
  let fixture: ComponentFixture<ProfileCouncilInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCouncilInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCouncilInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
