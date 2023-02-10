import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAsignaturasComponent } from './query-asignaturas.component';

describe('QueryAsignaturasComponent', () => {
  let component: QueryAsignaturasComponent;
  let fixture: ComponentFixture<QueryAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryAsignaturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
