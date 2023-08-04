import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerGameScreenComponent } from './answer-game-screen.component';

describe('AnswerGameScreenComponent', () => {
  let component: AnswerGameScreenComponent;
  let fixture: ComponentFixture<AnswerGameScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerGameScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
