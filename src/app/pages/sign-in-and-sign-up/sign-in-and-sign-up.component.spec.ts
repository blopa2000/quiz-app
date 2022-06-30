import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAndSignUpComponent } from './sign-in-and-sign-up.component';

describe('SignInComponent', () => {
  let component: SignInAndSignUpComponent;
  let fixture: ComponentFixture<SignInAndSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInAndSignUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAndSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
