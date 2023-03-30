import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTareaComponent } from './vista-tarea.component';

describe('VistaTareaComponent', () => {
  let component: VistaTareaComponent;
  let fixture: ComponentFixture<VistaTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaTareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
