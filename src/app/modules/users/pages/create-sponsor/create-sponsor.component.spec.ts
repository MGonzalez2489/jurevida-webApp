import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSponsorComponent } from './create-sponsor.component';

describe('CreateSponsorComponent', () => {
  let component: CreateSponsorComponent;
  let fixture: ComponentFixture<CreateSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSponsorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
