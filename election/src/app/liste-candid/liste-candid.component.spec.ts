import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCandidComponent } from './liste-candid.component';

describe('ListeCandidComponent', () => {
  let component: ListeCandidComponent;
  let fixture: ComponentFixture<ListeCandidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCandidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCandidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
