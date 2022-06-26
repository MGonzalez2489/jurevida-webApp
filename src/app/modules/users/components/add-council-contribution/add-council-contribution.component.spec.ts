import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouncilContributionComponent } from './add-council-contribution.component';

describe('AddCouncilContributionComponent', () => {
  let component: AddCouncilContributionComponent;
  let fixture: ComponentFixture<AddCouncilContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCouncilContributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCouncilContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
