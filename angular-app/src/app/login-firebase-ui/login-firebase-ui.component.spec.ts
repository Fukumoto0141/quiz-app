import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirebaseUIComponent } from './login-firebase-ui.component';

describe('LoginFirebaseUIComponent', () => {
  let component: LoginFirebaseUIComponent;
  let fixture: ComponentFixture<LoginFirebaseUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFirebaseUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFirebaseUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
