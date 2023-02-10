import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponentTelefonos } from './form.component';

describe('FormComponent', () => {
  let component: FormComponentTelefonos;
  let fixture: ComponentFixture<FormComponentTelefonos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponentTelefonos ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponentTelefonos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
