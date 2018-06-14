import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossiblesComponent } from './possibles.component';

describe('PossiblesComponent', () => {
  let component: PossiblesComponent;
  let fixture: ComponentFixture<PossiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
