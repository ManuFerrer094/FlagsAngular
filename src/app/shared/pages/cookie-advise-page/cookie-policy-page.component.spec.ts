import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieAdvisePageComponent } from './cookie-policy-page.component';

describe('CookieAdvisePageComponent', () => {
  let component: CookieAdvisePageComponent;
  let fixture: ComponentFixture<CookieAdvisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieAdvisePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieAdvisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
