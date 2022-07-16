import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssistantModalComponent } from './create-assistant-modal.component';

describe('CreateAssistantModalComponent', () => {
  let component: CreateAssistantModalComponent;
  let fixture: ComponentFixture<CreateAssistantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssistantModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssistantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
