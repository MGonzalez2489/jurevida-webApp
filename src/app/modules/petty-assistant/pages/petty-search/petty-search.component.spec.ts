import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettySearchComponent } from './petty-search.component';

describe('PettySearchComponent', () => {
  let component: PettySearchComponent;
  let fixture: ComponentFixture<PettySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
