import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantSearchComponent } from './assistant-search.component';

describe('AssistantSearchComponent', () => {
  let component: AssistantSearchComponent;
  let fixture: ComponentFixture<AssistantSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
