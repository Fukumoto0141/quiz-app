import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGameScreenComponent } from './main-game-screen.component';

describe('MainGameScreenComponent', () => {
  let component: MainGameScreenComponent;
  let fixture: ComponentFixture<MainGameScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGameScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
