import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedComponent } from './associated.component';

describe('AssociatedComponent', () => {
  let component: AssociatedComponent;
  let fixture: ComponentFixture<AssociatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
