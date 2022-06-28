import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserInfoModalComponent } from './edit-user-info-modal.component';

describe('EditUserInfoModalComponent', () => {
  let component: EditUserInfoModalComponent;
  let fixture: ComponentFixture<EditUserInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
