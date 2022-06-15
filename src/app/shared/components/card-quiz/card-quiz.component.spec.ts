import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuizComponent } from './card-quiz.component';

describe('CardQuizComponent', () => {
  let component: CardQuizComponent;
  let fixture: ComponentFixture<CardQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
