import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponentDirecciones } from './form.component';

describe('FormComponent', () => {
  let component: FormComponentDirecciones;
  let fixture: ComponentFixture<FormComponentDirecciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponentDirecciones ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponentDirecciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
