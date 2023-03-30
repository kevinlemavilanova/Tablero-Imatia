import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NTareaFormComponent } from './n-tarea-form.component';

describe('NTareaFormComponent', () => {
  let component: NTareaFormComponent;
  let fixture: ComponentFixture<NTareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NTareaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NTareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
