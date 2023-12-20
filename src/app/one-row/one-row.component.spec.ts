import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRowComponent } from './one-row.component';

describe('OneRowComponent', () => {
  let component: OneRowComponent;
  let fixture: ComponentFixture<OneRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneRowComponent]
    });
    fixture = TestBed.createComponent(OneRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
