import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversacionPage } from './conversacion.page';

describe('ConversacionPage', () => {
  let component: ConversacionPage;
  let fixture: ComponentFixture<ConversacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
