import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminadosPage } from './eliminados.page';

describe('EliminadosPage', () => {
  let component: EliminadosPage;
  let fixture: ComponentFixture<EliminadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
